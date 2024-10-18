import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import {
  listAllFuncionarios,
  deleteFuncionario,
  updateServico,
  getServicosByFuncionario,
} from "../../service";
import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalSelect,
  ModalButtonContainer,
  ModalButton,
  StyledModal,
} from "../Modal/styles";

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  funcionarioId: number;
}

export function ConfirmationModal({
  isOpen,
  onRequestClose,
  funcionarioId,
}: ConfirmationModalProps) {
  const [funcionarios, setFuncionarios] = useState<any[]>([]);
  const [novoResponsavelId, setNovoResponsavelId] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (isOpen) {
      listAllFuncionarios()
        .then((response) => setFuncionarios(response.data))
        .catch((error) => console.error("Erro ao buscar funcionários:", error));
    }
  }, [isOpen]);

  const handleDelete = async () => {
    console.log("ID do Funcionário:", funcionarioId);
    try {
      const response = await getServicosByFuncionario(funcionarioId);
      const servicos = response.data;
      console.log("Serviços recebidos:", servicos);

      if (Array.isArray(servicos) && servicos.length > 0) {
        if (novoResponsavelId === null) {
          alert("Por favor, selecione um novo responsável.");
          return;
        }

        console.log("Responsavel Novo:", novoResponsavelId);

        for (const servico of servicos) {
          console.log(`Atualizando serviço ID: ${servico.IdServico}`);
          try {
            await updateServico(servico.IdServico, {
              status: servico.status,
              dataAtividade: servico.dataAtividade,
              tipoServico: servico.tipoServico,
              responsavel: novoResponsavelId,
              valorGasto: servico.valorGasto,
            });
          } catch (error) {
            console.error(
              `Erro ao atualizar serviço ${servico.IdServico}:`,
              error
            );
          }
        }
        alert("Todos os serviços foram transferidos para o novo responsável.");

        await deleteFuncionario(funcionarioId);
        alert("Funcionário excluído com sucesso!");
        onRequestClose();
      } else {
        console.log("Nenhum serviço encontrado, excluindo funcionário.");
        await deleteFuncionario(funcionarioId);
        alert("Funcionário excluído com sucesso!");
        onRequestClose();
      }
    } catch (error) {
      console.error(
        "Erro ao transferir os serviços ou excluir o funcionário:",
        error
      );
      alert("Erro ao excluir o funcionário.");
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <StyledModal>
        <ModalHeader>
          <ModalTitle>Excluir Funcionário</ModalTitle>
          <button
            onClick={onRequestClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{ fontSize: "1.5rem" }}>✖</span>
          </button>
        </ModalHeader>
        <ModalBody>
          <p>
            Escolha um novo responsável para transferir os serviços do
            funcionário que será excluído:
          </p>
          <ModalSelect
            value={novoResponsavelId ?? ""}
            onChange={(e) => setNovoResponsavelId(Number(e.target.value))}
          >
            <option value="">Selecione um funcionário</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome}
              </option>
            ))}
          </ModalSelect>
          <ModalButtonContainer>
            <ModalButton primary onClick={handleDelete}>
              Confirmar
            </ModalButton>
            <ModalButton onClick={onRequestClose}>Cancelar</ModalButton>
          </ModalButtonContainer>
        </ModalBody>
      </StyledModal>
    </ReactModal>
  );
}
