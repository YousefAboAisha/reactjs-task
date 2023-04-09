import { IconsData } from "../Data/iconsData";
import { RoutesData } from "../Data/routesData";

const Navbar = () => {
  return (
    <nav
      className={`fixed w-full h-[60px] top-0 left-0 z-10 items-center bg-theme text-theme duration-500 shadow-md`}
    >
      <div className="container flex flex-row justify-between items-center h-full">
        <div
          className={`flex items-center justify-center gap-8 md:gap-6 lg:gap-8`}
        >
          {RoutesData.map((elem, index) => {
            return (
              <span
                key={index}
                className={`duration-300 cursor-pointer 
             `}
                title={elem.title}
              >
                <span className="hidden md:block lg:block">{elem.title}</span>
                <span>
                  {
                    <elem.icon
                      size={22}
                      className="lg:hidden md:hidden block"
                    />
                  }
                </span>
              </span>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          {IconsData.map((Icon, index) => {
            return <Icon key={index} size={22} />;
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
