import { useState, useEffect } from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('useEffect should work', () => {
  function Foo() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState([]);
    const [num, setNum] = useState(0);

    useEffect(() => {
      setList([...list, count])
    }, [count]);

    return (
      <>
        <p data-testid="list">{ list.length }</p>
        <p data-testid="count">{ count }</p>
        <button onClick={() => { setCount(count + 1) }}>add count</button>
        <p data-testid="num">{ num }</p>
        <button onClick={() => { setNum(num + 1) }}>add num</button>
      </>
    );
  }

  it('initial state', () => {
    const { getByTestId } = render(<Foo />);
    expect(getByTestId('count').innerHTML).toEqual('0');
    expect(getByTestId('list').innerHTML).toEqual('1'); // [0]
  })

  it('after click add count button, count should be one and list length equal to two', () => {
    const { getByText, getByTestId } = render(<Foo />);
    fireEvent.click(getByText('add count'));
    expect(getByTestId('count').innerHTML).toEqual('1');
    expect(getByTestId('list').innerHTML).toEqual('2'); // [0, 1]
  })

  it('after click add num button, num should be one and list should not be affected', () => {
    const { getByText, getByTestId } = render(<Foo />);
    fireEvent.click(getByText('add num'));
    expect(getByTestId('num').innerHTML).toEqual('1');
    expect(getByTestId('list').innerHTML).toEqual('1'); // [0]
  })
})