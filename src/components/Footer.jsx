import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "/Img/Logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footerIcons">
          <div className="fIcon">
            <img
              className="carsIcon"
              src="https://cdn-icons-png.flaticon.com/512/223/223399.png"
              alt=""
            />
            <span>
              <h3>India’s #1</h3>
              <p>Largest Auto portal</p>
            </span>
          </div>
          <div className="fIcon">
            <img
              className="carsIcon"
              src="https://www.iconpacks.net/icons/2/free-car-icon-2897-thumb.png"
              alt=""
            />
            <span>
              <h3>Car Sold</h3>
              <p>Every Single Day</p>
            </span>
          </div>
          <div className="fIcon">
            <img
              className="carsIcon"
              src="https://static.thenounproject.com/png/1926350-200.png"
              alt=""
            />
            <span>
              <h3>Compare</h3>
              <p>Decode The Right Car</p>
            </span>
          </div>
          <div className="fIcon">
            <img
              className="carsIcon"
              src="https://cdn-icons-png.flaticon.com/128/2977/2977921.png"
              alt=""
            />
            <span>
              <h3>Offers</h3>
              <p>Stay updated pay less</p>
            </span>
          </div>
        </div>

        <div className="svg">
          <NavLink target="_blank" to="https://instagram.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              color="#000000"
              fill="none"
              className="instagram"
            >
              <path
                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M17.5078 6.5L17.4988 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink target="_blank" to="https://x.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              color="#000000"
              fill="none"
              className="twitter"
            >
              <path
                d="M3 21L10.5484 13.4516M21 3L13.4516 10.5484M13.4516 10.5484L8 3H3L10.5484 13.4516M13.4516 10.5484L21 21H16L10.5484 13.4516"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink target="_blank" to="https://facebook.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              color="#000000"
              fill="none"
              className="facebook"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.18182 10.3333C5.20406 10.3333 5 10.5252 5 11.4444V13.1111C5 14.0304 5.20406 14.2222 6.18182 14.2222H8.54545V20.8889C8.54545 21.8081 8.74951 22 9.72727 22H12.0909C13.0687 22 13.2727 21.8081 13.2727 20.8889V14.2222H15.9267C16.6683 14.2222 16.8594 14.0867 17.0631 13.4164L17.5696 11.7497C17.9185 10.6014 17.7035 10.3333 16.4332 10.3333H13.2727V7.55556C13.2727 6.94191 13.8018 6.44444 14.4545 6.44444H17.8182C18.7959 6.44444 19 6.25259 19 5.33333V3.11111C19 2.19185 18.7959 2 17.8182 2H14.4545C11.191 2 8.54545 4.48731 8.54545 7.55556V10.3333H6.18182Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink target="_blank" to="https://linkedin.com">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="25"
              color="#000000"
              fill="none"
              className="linkedin"
            >
              <path
                d="M4.5 9.5H4C3.05719 9.5 2.58579 9.5 2.29289 9.79289C2 10.0858 2 10.5572 2 11.5V20C2 20.9428 2 21.4142 2.29289 21.7071C2.58579 22 3.05719 22 4 22H4.5C5.44281 22 5.91421 22 6.20711 21.7071C6.5 21.4142 6.5 20.9428 6.5 20V11.5C6.5 10.5572 6.5 10.0858 6.20711 9.79289C5.91421 9.5 5.44281 9.5 4.5 9.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 4.25C6.5 5.49264 5.49264 6.5 4.25 6.5C3.00736 6.5 2 5.49264 2 4.25C2 3.00736 3.00736 2 4.25 2C5.49264 2 6.5 3.00736 6.5 4.25Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12.326 9.5H11.5C10.5572 9.5 10.0858 9.5 9.79289 9.79289C9.5 10.0858 9.5 10.5572 9.5 11.5V20C9.5 20.9428 9.5 21.4142 9.79289 21.7071C10.0858 22 10.5572 22 11.5 22H12C12.9428 22 13.4142 22 13.7071 21.7071C14 21.4142 14 20.9428 14 20L14.0001 16.5001C14.0001 14.8433 14.5281 13.5001 16.0879 13.5001C16.8677 13.5001 17.5 14.1717 17.5 15.0001V19.5001C17.5 20.4429 17.5 20.9143 17.7929 21.2072C18.0857 21.5001 18.5572 21.5001 19.5 21.5001H19.9987C20.9413 21.5001 21.4126 21.5001 21.7055 21.2073C21.9984 20.9145 21.9985 20.4432 21.9987 19.5006L22.0001 14.0002C22.0001 11.515 19.6364 9.50024 17.2968 9.50024C15.9649 9.50024 14.7767 10.1531 14.0001 11.174C14 10.5439 14 10.2289 13.8632 9.995C13.7765 9.84686 13.6531 9.72353 13.505 9.63687C13.2711 9.5 12.9561 9.5 12.326 9.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
          <NavLink
            to="https://github.com/princeraval147/crazy-car"
            target="_blank"
          >
            <svg
              className="github"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#000000"}
              fill={"none"}
            >
              <path
                d="M6.51734 17.1132C6.91177 17.6905 8.10883 18.9228 9.74168 19.2333M9.86428 22C8.83582 21.8306 2 19.6057 2 12.0926C2 5.06329 8.0019 2 12.0008 2C15.9996 2 22 5.06329 22 12.0926C22 19.6057 15.1642 21.8306 14.1357 22C14.1357 22 13.9267 18.5826 14.0487 17.9969C14.1706 17.4113 13.7552 16.4688 13.7552 16.4688C14.7262 16.1055 16.2043 15.5847 16.7001 14.1874C17.0848 13.1032 17.3268 11.5288 16.2508 10.0489C16.2508 10.0489 16.5318 7.65809 15.9996 7.56548C15.4675 7.47287 13.8998 8.51192 13.8998 8.51192C13.4432 8.38248 12.4243 8.13476 12.0018 8.17939C11.5792 8.13476 10.5568 8.38248 10.1002 8.51192C10.1002 8.51192 8.53249 7.47287 8.00036 7.56548C7.46823 7.65809 7.74917 10.0489 7.74917 10.0489C6.67316 11.5288 6.91516 13.1032 7.2999 14.1874C7.79575 15.5847 9.27384 16.1055 10.2448 16.4688C10.2448 16.4688 9.82944 17.4113 9.95135 17.9969C10.0733 18.5826 9.86428 22 9.86428 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </div>
        <div className="footerAbout">
          <div className="footerLinks">
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/car">Car</NavLink>
            <NavLink to="/signUp">Create Account</NavLink>
          </div>
          <div className="footerLogo">
            <NavLink className="logo" to="/">
              <img src={Logo} className="LogoImg" alt="" />
            </NavLink>
          </div>
        </div>
        <div className="FooterLastText">
          <span>CrazyCar &copy; 2024 @All Rights Reserved</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
