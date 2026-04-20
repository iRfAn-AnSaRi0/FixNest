import { Link, useLocation } from "react-router-dom";
import Container from "../layout/Container";

const Tabs = () => {
  const location = useLocation();

  const tabs = [
    { name: "Dashboard", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Technicians", path: "/technicians" },
  ];

  return (
<Container>
    <div className="text-sm text-muted font-sans pt-6 flex items-center gap-2 flex-wrap">
      {tabs.map((tab, index) => (
        <div key={tab.name} className="flex items-center gap-2">
          
          <Link
            to={tab.path}
            className={`transition hover:text-primary ${
              location.pathname === tab.path
                ? "text-text font-medium"
                : ""
            }`}
          >
            {tab.name}
          </Link>

          {index !== tabs.length - 1 && <span>/</span>}
        </div>
      ))}
    </div>
    </Container>
  );
};

export default Tabs;