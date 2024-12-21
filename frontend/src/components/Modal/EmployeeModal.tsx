import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import {
  listAllFuncionarios,
  deleteFuncionario,
} from "../../service/funcionario/funcionarioService";
import {
  updateServico,
  getServicosByFuncionario,
} from "../../service/servicos/servicos";
import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalSelect,
  ModalButtonContainer,
  ModalButton,
  StyledModal,
} from "../Modal/styles";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  const [temServicos, setTemServicos] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      verificarServicos(funcionarioId);
    }
  }, [isOpen, funcionarioId]);

  // Função para verificar se o funcionário tem serviços vinculados
  const verificarServicos = async (funcionarioId: number) => {
    try {
      const response = await getServicosByFuncionario(funcionarioId);
      setTemServicos(response.data.length > 0);

      // Se houver serviços, buscar outros funcionários para transferência
      if (response.data.length > 0) {
        const funcionariosResponse = await listAllFuncionarios();
        const filteredFuncionarios = funcionariosResponse.data.filter(
          (funcionario: any) => funcionario.id !== funcionarioId
        );
        setFuncionarios(filteredFuncionarios);
      }
    } catch (error) {
      console.error("Erro ao verificar serviços:", error);

    }
  };

  // Função para excluir diretamente se não houver serviços
  const handleDeleteSemServicos = async () => {
    try {
      await deleteFuncionario(funcionarioId);
      toast.success("Funcionário excluído com sucesso!");
      onRequestClose();
      navigate("/employees/");
    } catch (error: unknown) {
      console.error("Erro ao excluir funcionário:", error);
    }
  };



  // Função para excluir com transferência de serviços
  const handleDeleteComServicos = async () => {
    if (!novoResponsavelId) {
      alert("Por favor, selecione um novo responsável.");
      return;
    }

    try {
      const response = await getServicosByFuncionario(funcionarioId);
      const servicos = response.data;

      // Transferir serviços para o novo responsável
      for (const servico of servicos) {
        await updateServico(servico.IdServico, {
          ...servico,
          responsavel: novoResponsavelId,
        });
      }

      // Excluir funcionário
      await deleteFuncionario(funcionarioId);
      toast.success("Funcionário excluído e serviços transferidos com sucesso!");
      onRequestClose();
      navigate("/employees/");
    } catch (error) {
      console.error("Erro ao excluir funcionário ou transferir serviços:", error);
      toast.error("Erro ao excluir funcionário.");
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
          {temServicos ? (
            <>
              <p>
                Este funcionário possui serviços vinculados. Escolha um novo responsável
                para transferir os serviços antes de excluir:
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
                <ModalButton primary onClick={handleDeleteComServicos}>
                  Confirmar
                </ModalButton>
                <ModalButton onClick={onRequestClose}>Cancelar</ModalButton>
              </ModalButtonContainer>
            </>
          ) : (
            <>
              <p>
                Este funcionário não possui serviços vinculados. Deseja confirmar a
                exclusão?
              </p>
              <ModalButtonContainer>
                <ModalButton primary onClick={handleDeleteSemServicos}>
                  Confirmar
                </ModalButton>
                <ModalButton onClick={onRequestClose}>Cancelar</ModalButton>
              </ModalButtonContainer>
            </>
          )}
        </ModalBody>
      </StyledModal>
    </ReactModal>
  );
}
