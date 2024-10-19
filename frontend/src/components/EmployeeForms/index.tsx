import React from 'react';
import * as Styled from './styles';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createFuncionario } from '../../service';
import { toast } from 'react-toastify';

type FormValues = {
  name: string
  email: string;
  cpf: string;
  address: string;
  role: string;
  payment: number;
  birthDate: Date;
};


export function EmployeeForms(): JSX.Element {
  const { register, handleSubmit, formState, reset } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const funcionario = {
      nome: data.name,
      email: data.email,
      cpf: data.cpf,
      endereco: data.address,
      funcao: data.role,
      salario: data.payment,
      dataNascimento: data.birthDate
    }
    createFuncionario(funcionario)
      .then(resp => {
        console.log(resp)
        localStorage.setItem('funcionario', JSON.stringify(funcionario));
        toast.success('Operação realizada com sucesso!')
        reset()
        navigate('/employees')
      })
      .catch(error => {
        console.log(error)
        toast.error('Erro ao realizar a operação!')
      })

    //console.log("submited", funcionario)
  }
  return (
    <Styled.Container>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <Styled.TitleDiv>
          <Styled.Title>Cadastro de novo funcionário</Styled.Title>
          <Styled.ButtonDiv>
            <Styled.Button type='submit' disabled={formState.isSubmitting}>Salvar informações</Styled.Button>
            <Styled.Button onClick={() => navigate('/employees')}>Voltar</Styled.Button>
          </Styled.ButtonDiv>

        </Styled.TitleDiv>

        <Styled.InputDiv>
          <Styled.Label>
            Nome:
            <Styled.Input
              type="text"
              placeholder='Nome'
              disabled={formState.isSubmitting}
              {...register('name', { required: true })}
            />
            {formState.errors.name && <Styled.Error>Nome é obrigatório</Styled.Error>}
          </Styled.Label>
          <Styled.RowDiv>
            <Styled.InputWrapper >
              <Styled.Label>
                CPF:
                <Styled.Input
                  style={{ marginLeft: 89 }}
                  type="text"
                  placeholder='CPF'
                  {...register('cpf', { required: true })}
                  disabled={formState.isSubmitting}
                />
                {formState.errors.cpf && <Styled.Error>CPF é obrigatório</Styled.Error>}
              </Styled.Label>
            </Styled.InputWrapper>
            <Styled.InputWrapper >
              <Styled.Label>
                Data de nascimento:
                <Styled.Input
                  type="date"
                  placeholder=''
                  {...register('birthDate', { required: true })}
                  disabled={formState.isSubmitting}
                />
                {formState.errors.birthDate && <Styled.Error style={{ bottom: 0 }}>Data de nascimento é obrigatória</Styled.Error>}

              </Styled.Label>
            </Styled.InputWrapper>
          </Styled.RowDiv>



          <Styled.Label>
            Endereço:
            <Styled.Input
              type="text"
              placeholder='Endereço'
              {...register('address', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.address && <Styled.Error>Endereço é obrigatório</Styled.Error>}
          </Styled.Label>

          <Styled.Label>
            Email:
            <Styled.Input
              type="email"
              placeholder='Email'
              {...register('email', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.email && <Styled.Error>Email é obrigatório</Styled.Error>}

          </Styled.Label>
          <Styled.Label>
            Função:
            <Styled.Input
              type="text"
              placeholder='Função'
              {...register('role', { required: true })}
              disabled={formState.isSubmitting}
            />
            {formState.errors.role && <Styled.Error>Função é obrigatória</Styled.Error>}
          </Styled.Label>


          <Styled.Label style={{ gap: 20 }}>
            Valor do pagamento:
            <Styled.Input
              type="text"
              placeholder='valor'
              disabled={formState.isSubmitting}
              {...register('payment', { required: true })}
            />
            {formState.errors.payment && <Styled.Error>Pagamento é obrigatório</Styled.Error>}
          </Styled.Label>

          <Styled.Label >
            Observações:
            <Styled.ObservacaoInput
              placeholder='observações...'
            //disabled={formState.isSubmitting}
            />
          </Styled.Label>

        </Styled.InputDiv>

      </Styled.Form>
    </Styled.Container>


  );
};