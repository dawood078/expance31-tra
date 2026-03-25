import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';
import { InnerLayout } from '../../styles/Layouts';

function Transactions() {
    const { incomes, expenses } = useGlobalContext()

    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return (
        <TransactionsStyled>
            <InnerLayout>
                <h2>Transaction History</h2>
                {history.map((item) => {
                    const { _id, title, amount, type, createdAt } = item
                    return (
                        <div key={_id} className="history-item">
                            <div className="text">
                                <p style={{
                                    color: type === 'expense' ? 'red' : 'var(--color-green)'
                                }}>
                                    {title}
                                </p>
                                <p style={{
                                    fontSize: '0.8rem',
                                    color: 'rgba(34, 34, 96, 0.6)'
                                }}>
                                    {dateFormat(createdAt)}
                                </p>
                            </div>
                            <p style={{
                                color: type === 'expense' ? 'red' : 'var(--color-green)'
                            }}>
                                {
                                    type === 'expense' ? `-${amount}` : `+${amount}`
                                }
                            </p>
                        </div>
                    )
                })}
            </InnerLayout>
        </TransactionsStyled>
    )
}

const TransactionsStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history-item{
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text{
            display: flex;
            flex-direction: column;
            gap: .2rem;
        }
    }
`;

export default Transactions
