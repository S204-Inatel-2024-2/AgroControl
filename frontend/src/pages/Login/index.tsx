import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Styled from "./styled";
import { useNavigate } from "react-router";
//import RotateBanner from '../../components/RotateBanner';
import { login } from '../../service';
import RotateBanner from '../../components/RotateBanner';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../images/Logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormValues = {
  email: string;
  password: string;
};



export function LoginPage(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    toast.success('Operação realizada com sucesso!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      style: {
        backgroundColor: '#4CAF50', // verde
        color: '#fff',
      },
    });
  };

  const handleError = () => {
    setError(true);
    toast.error('Erro ao realizar a operação!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      style: {
        backgroundColor: '#FF9800', // laranja
        color: '#fff',
      },
    });
  };

  const onSubmit = (data: FormValues) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    login(user)
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", resp.data.token);
        toast.success('Operação realizada com sucesso!')
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        toast.error('Erro ao realizar a operação!')

      });
  };

  return (
    <>
      <Styled.Container>
        <Styled.DivInputs>
          <Styled.ImageSlider key={logo} src={logo} alt={`Imagem ${logo}`} />
          <Styled.Title>Agrocontrol</Styled.Title>
          <Styled.Form onSubmit={handleSubmit(onSubmit)}>
            <Styled.Label>
              <Styled.Input
                type="email"
                placeholder="Entre com o e-mail"
                {...register("email", { required: true })}
                disabled={formState.isSubmitting}
              />
              {formState.errors.email && (
                <Styled.Error>Email é obrigatório</Styled.Error>
              )}
            </Styled.Label>

            <Styled.Label>
              <Styled.Input
                type={showPassword ? "text" : "password"}
                placeholder="Entre com a senha"
                // minLength={8}
                {...register("password", { required: true })}
                disabled={formState.isSubmitting}
              />
              <Styled.EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </Styled.EyeIcon>
              {formState.errors.password && (
                <Styled.Error>Senha é obrigatória</Styled.Error>
              )}
            </Styled.Label>

            <Styled.RecoverPassword>
              <div onClick={() => navigate("/RecoverPassword")}>
                {" "}
                Esqueceu a senha?
              </div>{" "}
            </Styled.RecoverPassword>

            <Styled.Button type="submit" disabled={formState.isSubmitting}>
              Acessar
            </Styled.Button>
            <Styled.RecoverPassword>
              Ainda não possui uma conta?{" "}
              <div
                className="textOnClick"
                onClick={() => navigate(`/createAccount`)}
              >
                Cadastre-se
              </div>
            </Styled.RecoverPassword>
          </Styled.Form>
        </Styled.DivInputs>
        <Styled.DivImage>
          <RotateBanner />
        </Styled.DivImage>
      </Styled.Container>
    </>
  );
}
