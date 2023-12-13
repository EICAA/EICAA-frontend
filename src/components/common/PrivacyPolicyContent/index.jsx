import React, { Fragment, useMemo } from 'react';
import { useLocation } from 'react-router';
import { useIntl } from 'react-intl';
import { objectGet } from '../../../utils/lib/youmightnotneed-lodash';
import './index.scss';

const usePath = (intl, path) => {
  return useMemo(() => {
    return objectGet(intl.messages, path);
  }, [intl, path]);
};

const ORDERED_LIST_TYPES = ['I', 'a'];

const TextSections = ({ intl, path, level, sectionId, className }) => {
  const root = usePath(intl, path);

  const olType = ORDERED_LIST_TYPES[level ? Math.min(level, ORDERED_LIST_TYPES.length) : 0];

  return (
    <ol type={olType} className={`${className}__sections-${level}`}>
      {root.map((section, idx) => {
        const nestedSectionId = level === 0 ? `section-${idx + 1}` : `${sectionId}-${idx}`;

        return (
          <TextSection
            key={idx}
            intl={intl}
            path={`${path}[${idx}]`}
            level={level + 1}
            sectionId={nestedSectionId}
            className={className}
          />
        );
      })}
    </ol>
  );
};

const TextTable = ({ intl, path, level = 0, className }) => {
  const root = usePath(intl, path);

  const { header, body } = root;

  return (
    <table className={`${className}__table`}>
      <thead>
        <tr className={`${className}__header-row`}>
          {header.map((text, idx) => (
            <th key={idx}>{text}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((bodyRow, idx) => (
          <tr key={idx} className={`${className}___body-row`}>
            {bodyRow.map((text, idx1) => (
              <td key={idx1}>{text}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TextList = ({ intl, path, level = 0, className }) => {
  const root = usePath(intl, path);

  return (
    <ul className={`${className}__list`}>
      {root.map((item, idx) => (
        <li key={idx} className={`${className}__list-item`}>
          {item}
        </li>
      ))}
    </ul>
  );
};

const TextSpan = ({ intl, path, level = 0, className }) => {
  const root = usePath(intl, path);

  if (typeof root === 'string') {
    return <span>{root}</span>;
  }

  if (root.link) {
    const { link, linkText } = root;
    return (
      <a href={link} rel="noopener noreferrer">
        <span>{linkText || link}</span>
      </a>
    );
  }

  if (root.spans) {
    return <TextSpans intl={intl} path={`${path}.spans`} className={className} />;
  }

  return null;
};

const TextSpans = ({ intl, path, level = 0, inline = true, className }) => {
  const root = usePath(intl, path);

  const WrapperTag = inline ? 'span' : 'p';

  return (
    <WrapperTag className={`${className}__spans`}>
      {root.map((span, idx) => (
        <TextSpan key={idx} intl={intl} path={`${path}[${idx}]`} className={className} />
      ))}
    </WrapperTag>
  );
};

const TextData = ({ intl, path, level = 0, className }) => {
  const root = usePath(intl, path);

  return (
    <p className={`${className}__data`}>
      {root.map((line, idx) => {
        return (
          <Fragment key={idx}>
            <TextSpan key={idx} intl={intl} path={`${path}[${idx}]`} className={className} />
            {idx < root.length - 1 ? <br /> : null}
          </Fragment>
        );
      })}
    </p>
  );
};

const TextNode = ({ intl, path, level = 0, sectionId, className }) => {
  const root = usePath(intl, path);

  if (typeof root === 'string') {
    return <p className={`${className}__para`}>{root}</p>;
  }

  if (root.spans) {
    return (
      <TextSpans
        intl={intl}
        path={`${path}.spans`}
        level={level}
        inline={false}
        className={className}
      />
    );
  }

  if (root.data) {
    return <TextData intl={intl} path={`${path}.data`} level={level} className={className} />;
  }

  if (root.sections) {
    return (
      <TextSections
        intl={intl}
        path={`${path}.sections`}
        level={level}
        sectionId={sectionId}
        className={className}
      />
    );
  }

  if (root.list) {
    return <TextList intl={intl} path={`${path}.list`} className={className} />;
  }

  if (root.table) {
    return <TextTable intl={intl} path={`${path}.table`} className={className} />;
  }

  return null;
};

const TextSection = ({ intl, path, level = 0, sectionId, className }) => {
  const root = usePath(intl, path);

  const { title, content } = root;

  const HeadingTag = useMemo(() => {
    return `h${Math.min(6, level + 1)}`;
  }, [level]);

  const mappedContent = useMemo(() => {
    return (
      <div className={`${className}__content-${level}`}>
        {content.map((node, idx) => (
          <TextNode
            key={idx}
            intl={intl}
            path={`${path}.content[${idx}]`}
            level={level}
            sectionId={sectionId}
            className={className}
          />
        ))}
      </div>
    );
  }, [content, intl, path, level, sectionId, className]);

  if (level === 0) {
    return (
      <Fragment>
        <HeadingTag className={`${className}__title-${level}`}>{title}</HeadingTag>
        {mappedContent}
      </Fragment>
    );
  }

  return (
    <li className={`${className}__section-${level}`} id={sectionId}>
      <HeadingTag className={`${className}__title-${level}`}>{title}</HeadingTag>
      {mappedContent}
    </li>
  );
};

const PrivacyPolicyContent = () => {
  const intl = useIntl();

  const { hash } = useLocation();

  React.useEffect(() => {
    if (hash && intl.messages.gdpr?.privacyPolicy) {
      const element = document.getElementById(hash.substring(1));

      if (element) {
        element.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'start' });
      }
    }
  }, [hash, intl]);

  if (!intl.messages.gdpr?.privacyPolicy) {
    return null;
  }

  return (
    <div className="pp-content__wrapper">
      <TextSection intl={intl} path={'gdpr.privacyPolicy'} className="pp-content" />
    </div>
  );
};

export default PrivacyPolicyContent;
