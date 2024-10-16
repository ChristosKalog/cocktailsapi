import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import SearchBar from "../../components/ui/SearchBar";
import styles from "../../styles/Dashboard.module.css";

const Dashboard = () => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // Retrieve menus from localStorage on component mount
    const savedMenus = JSON.parse(localStorage.getItem("menus")) || [];
    setMenus(savedMenus);
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
      <Link to="/recipe/Add">Add a Recipe!</Link>
     
    </div>
  );
};

export default Dashboard;
