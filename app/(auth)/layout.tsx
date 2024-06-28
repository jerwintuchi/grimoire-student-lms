import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNav />
      <div className="h-[calc(100vh-40px)] flex items-center justify-center bg-white no-scroll">
        {children}
      </div>
    </>
  );
};

export default AuthLayout;
