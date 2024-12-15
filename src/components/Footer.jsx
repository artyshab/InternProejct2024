import { useTranslation } from "react-i18next";

export default function Footer({title}) {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <footer>
        <div className="copyright">
            <p>{title}</p>
        </div>
        <div className="buttons">
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('de')}>Deutsch</button>
        </div>
    </footer>
  );
}
