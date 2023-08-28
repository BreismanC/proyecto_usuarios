import { Title } from "@atoms/Title/Title";
import { UserCard } from "@molecules/UserCard/UserCard";

export const User = () => {
  return (
    <div>
      <Title title="Perfil del usuario" />
      <UserCard />
    </div>
  );
};
