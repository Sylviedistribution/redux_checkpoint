import "../App.css";


const Footer = () => {
   return (
    <footer className="bg-dark text-light text-center">
        <p>
          © {new Date().getFullYear()} MyToDoApp. All rights reserved.
        </p>
    </footer>
  );
};

export default Footer;
