import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Dashboard.module.css";
import menuService from "../../services/menuService"; 
import ButtonComponent from "../../components/ui/ButtonComponent";



const Dashboard = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const retrievedMenus = await menuService.fetchMenus();
        setMenus(retrievedMenus); // Set the retrieved menus to state
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus(); // Call the fetchMenus function
  }, []);

  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      {/* <SearchBar placeholder="Search for menus..." onSearch={() => {}} /> */}
      <div className={styles.menusList}>
        <h3>Your Menus</h3>
        {menus.length > 0 ? (
          <div className={styles.menuItemsContainer}>
            {menus.map((menu) => (
              <div key={menu.id} className={styles.itemContainer}>
                <Link className={styles.menuLink} to={`/viewmenu/${menu.id}`}>
                  {menu.title}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p>
              No menus yet!
              <Link className={styles.link} to="/menu/create">
                {" "}
                Create your first!
              </Link>
            </p>
          </>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <ButtonComponent category="add">
          <Link to="/recipe/Add">add a recipe!</Link>
        </ButtonComponent>
      </div>
    </div>
  );
};

export default Dashboard;
