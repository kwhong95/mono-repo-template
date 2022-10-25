import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface FirstLibProps {}

const StyledFirstLib = styled.div`
  color: pink;
`;

export function FirstLib(props: FirstLibProps) {
  return (
    <StyledFirstLib>
      <h1>Welcome to FirstLib!</h1>
    </StyledFirstLib>
  );
}

export default FirstLib;
