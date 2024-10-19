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
import axios from "axios";

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
      // Obtém os serviços vinculados ao funcionário
      const servicos = await fetchServicos(funcionarioId);

      // Verifica se um novo responsável foi selecionado
      validateNovoResponsavel();

      // Se houver serviços, atualiza para o novo responsável
      if (servicos.length > 0) {
        await transferirServicos(servicos, novoResponsavelId);
      }

      // Exclui o funcionário após a transferência
      await excluirFuncionario(funcionarioId);
      alert("Funcionário excluído com sucesso!");
      onRequestClose();
    } catch (error) {
      handleError(error);
    }
  };

  // Função para buscar serviços
  const fetchServicos = async (funcionarioId: number) => {
    const response = await getServicosByFuncionario(funcionarioId);
    return response.data; // Retorna os serviços
  };

  // Função para validar novo responsável
  const validateNovoResponsavel = () => {
    if (novoResponsavelId === null) {
      alert("Por favor, selecione um novo responsável.");
      throw new Error("Novo responsável não selecionado.");
    }
    console.log("Responsável Novo:", novoResponsavelId);
  };

  // Função para transferir serviços
  const transferirServicos = async (
    servicos: any,
    novoResponsavelId: number | null
  ) => {
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
        console.error(`Erro ao atualizar serviço ${servico.IdServico}:`, error);
        alert(`Erro ao atualizar serviço ${servico.IdServico}}`);
      }
    }
    alert("Todos os serviços foram transferidos para o novo responsável.");
  };

  // Função para excluir o funcionário
  const excluirFuncionario = async (funcionarioId: number) => {
    await deleteFuncionario(funcionarioId);
  };

  // Função para lidar com erros
  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 404) {
        alert(
          "Nenhum serviço encontrado para este funcionário. Excluindo funcionário."
        );
        excluirFuncionario(funcionarioId);
        alert("Funcionário excluído com sucesso!");
        onRequestClose();
      } else {
        alert(`Erro ${error.response.status}: ${error.response.data.message}`);
      }
    } else {
      alert("Erro desconhecido ao excluir o funcionário.");
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
