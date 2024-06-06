import styled from "styled-components";
import PropTypes from "prop-types";
import DOMPurify from "dompurify";
// End Imports
const RTEContent = styled.div`
  font-family: Raleway, sans-serif, -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif,
    "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  line-height: 1.6;
  ul,
  ol {
    padding: 0 4rem;
  }
`;

const RTEBox = ({ htmlContent }) => {
  return (
    <RTEContent
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(htmlContent, {
          USE_PROFILES: { html: true },
        }),
      }}
    />
  );
};

RTEBox.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export default RTEBox;
