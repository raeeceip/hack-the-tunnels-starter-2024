import { Central as Layout } from "@/layouts";
import "./NotFound.style.scss";

function NotFound() {
  return (
    <Layout title={"Page Not Found"}>
      <div className="layout">
        <h1>404</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </Layout>
  );
}

export default NotFound;