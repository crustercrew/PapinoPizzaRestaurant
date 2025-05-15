import {createLazyFileRoute, Link} from '@tanstack/react-router'
import {useLanguage} from "../../context/Context.jsx";
import translations from "../../context/Translate.jsx";

export const Route = createLazyFileRoute('/')({
  component: index,
})

function index() {
    const { language, setLanguage } = useLanguage();
  return (
      <div className="index">
          <div className="index-brand">
              <h1>Papino Pizza</h1>
              <p>{translations[language].PizzaLocation}</p>
          </div>
          <ul>
              <li>
                  <Link to="/Order/Lazy">{translations[language].Order}</Link>
              </li>
              <li>
                  <Link to="/Past/Lazy">{translations[language].PastOrder}</Link>
              </li>
          </ul>
      </div>
  )
}
