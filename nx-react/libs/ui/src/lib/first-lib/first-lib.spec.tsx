import { render } from '@testing-library/react';

import FirstLib from './first-lib';

describe('FirstLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FirstLib />);
    expect(baseElement).toBeTruthy();
  });
});
