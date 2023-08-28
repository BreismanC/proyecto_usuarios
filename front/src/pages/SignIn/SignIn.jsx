import { SignInForm } from "@molecules/SignInForm/SignInForm";
import { Title } from "@atoms/Title/Title";

export const SignIn = () => {
  return (
    <section>
      <Title title="Iniciar sesión" />
      <SignInForm />
    </section>
  );
};
