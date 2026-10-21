
import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ current, onNavigate }: NavigationProps) {
  const menuItems: { label: string; page: PageName }[] = [
    { label: "Ana Sayfa", page: "home" },
    { label: "Etkinlikler", page: "events" },
    { label: "Etkinlik Ekle", page: "add" },
  ];

  return (
    <nav>
      {menuItems.map((item) => (
        <button
          key={item.page}
          onClick={() => onNavigate(item.page)}
          className={current === item.page ? "active" : ""}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default Navigation;
