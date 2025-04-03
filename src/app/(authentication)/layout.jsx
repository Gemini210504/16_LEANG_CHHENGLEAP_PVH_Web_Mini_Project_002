import Logo from "@/components/logo";

export default function AuthenticationLayout({ children }) {
  return (
    
      <div className="text-charcoal">
        <div className="container mx-auto my-12">
          <Logo />
        </div>

        {children}
      </div>
  
  );
}
