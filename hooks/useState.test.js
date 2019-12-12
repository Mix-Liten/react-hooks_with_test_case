import { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('useState should work', () => {
  function Foo() {
    const [count, setCount] = useState(0);
    return (
      <>
        <p data-testid="count">{ count }</p>
        <button onClick={() => { setCount(count + 1) }}>click me</button>
      </>
    );
  }

  it('initial state', () => {
    const { getByTestId } = render(<Foo />);
    expect(getByTestId('count').innerHTML).toEqual('0');
  })

  it('count should be one after click', () => {
    const { getByText, getByTestId } = render(<Foo />);
    fireEvent.click(getByText('click me'));
    expect(getByTestId('count').innerHTML).toEqual('1');
  })
})