import "../globals.css";
import MainNav from "../landing/mainnav";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="bg-[#13111c]">
        <video
          src={
            "https://utfs.io/f/5a452323-9047-417a-bf4a-eba2e44de6aa-qe7sdm.mp4"
          }
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover z-0" // Adjust z-index as need
        />
      <MainNav />
      <div className="h-[calc(100vh-72px)] flex items-center justify-center bg-white no-scroll z-20">
        {children}
      </div>
      </div>
    </>
  );
};

export default AuthLayout;
