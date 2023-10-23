import AdminSidebar from "./AdminSidebar";

const Category = () => {
  return (
    <div className="container">
      <AdminSidebar />
      <div className="main-content">Categories are listed here: </div>
      <form action="">
        <input type="text" name="category" />
        <button className="create-button">Create category</button>
      </form>
      <div className="category">
        <p>Category Name:</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Category;