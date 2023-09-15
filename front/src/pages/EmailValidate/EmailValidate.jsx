import { useSearchParams } from "react-router-dom";

export const EmailValidate = () => {
  const [params] = useSearchParams();
  const token = params.get("token") || undefined;

  console.log({ params });
  console.log({ token });
  return (
    <section className={`emailValidate`}>
      <h1>Valida tu email aquí!</h1>
      <h2>{token}</h2>
    </section>
  );
};
