import React from 'react'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'

import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext'
import { dateFormat } from '../../utils/dateFormat'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {
    const { incomes, expenses } = useGlobalContext()

    const data = {
        labels: [...new Set([...incomes.map(i => dateFormat(i.date)), ...expenses.map(e => dateFormat(e.date))])].sort((a, b) => new Date(a) - new Date(b)),
        datasets: [
            {
                label: 'Income',
                data: [...new Set([...incomes.map(i => dateFormat(i.date)), ...expenses.map(e => dateFormat(e.date))])].sort((a, b) => new Date(a) - new Date(b)).map(date => {
                    return incomes.filter(i => dateFormat(i.date) === date).reduce((acc, curr) => acc + curr.amount, 0)
                }),
                backgroundColor: 'green',
                tension: .2
            },
            {
                label: 'Expenses',
                data: [...new Set([...incomes.map(i => dateFormat(i.date)), ...expenses.map(e => dateFormat(e.date))])].sort((a, b) => new Date(a) - new Date(b)).map(date => {
                    return expenses.filter(e => dateFormat(e.date) === date).reduce((acc, curr) => acc + curr.amount, 0)
                }),
                backgroundColor: 'red',
                tension: .2
            }
        ]
    }


    return (
        <ChartStyled >
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart