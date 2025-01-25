import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Create breadcrumb items with proper capitalization and mapping
  const breadcrumbNameMap = {
    projects: 'Projects',
    about: 'About',
  };

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="sr-only"
      itemScope 
      itemType="https://schema.org/BreadcrumbList"
    >
      <ol className="flex items-center space-x-2">
        <li 
          itemProp="itemListElement" 
          itemScope 
          itemType="https://schema.org/ListItem"
        >
          <Link
            to="/"
            itemProp="item"
            className="flex items-center"
          >
            <FaHome className="w-4 h-4" aria-hidden="true" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const position = index + 2; // Home is 1, so we start at 2

          return (
            <React.Fragment key={name}>
              <li aria-hidden="true">
                <FaChevronRight className="w-3 h-3" />
              </li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {isLast ? (
                  <span
                    itemProp="item"
                    className="font-medium"
                    aria-current="page"
                  >
                    <span itemProp="name">{breadcrumbNameMap[name] || name}</span>
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    itemProp="item"
                    className="transition-colors"
                  >
                    <span itemProp="name">{breadcrumbNameMap[name] || name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={position.toString()} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
