import { SignUpForm } from "@molecules/SignUpForm/SignUpForm";
import { Title } from "@atoms/Title/Title";

export const SignUp = () => {
  return (
    <section>
      <Title title="Registrarse" />
      <SignUpForm />
    </section>
  );
};
