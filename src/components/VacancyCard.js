import React, { Component } from "react";
import * as DefaultTheme from '../theme/DefaultTheme';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	padding-top: 1rem;
	margin-top: 1rem;
`;
const Title = styled.h4`
	line-height: 1.5;
	font-weight: normal;
	margin: 0;
	transition: 0.3s all;
	color: ${props => props.active ? "inherit" : "rgba(0, 0, 0, 0.57)"};
`;
const VacancyStatus = styled.div`
	font-size: 13px;
	color: rgba(0, 0, 0, 0.57);
	display: flex;
	align-items: center;
	height: 1.5rem;
	span {
		margin-left: 0.75rem;
	}
	@media screen and (max-width: 575px) {
		height: auto;
	}
`;

class VacancyCard extends Component {
	render() {
		let data = this.props.vacancyData;
		return (
			<Wrapper>
				<Title
					active={data.status ? 'active' : null}
				>{data.title}
				</Title>
				<DefaultTheme.Row>
					{data.status ?
						<VacancyStatus>
							<img src="./img/checkmark.png" alt="checkmark"/>
							<span>Вакансия открыта, идет подбор кандидатов</span>
						</VacancyStatus>
						:
						<VacancyStatus>
							<img src="./img/search.png" alt="search"/>
							<span>Вакансия закрыта, сотрудник нанят</span>
						</VacancyStatus>
					}
					<DefaultTheme.ControlBox>
						<DefaultTheme.ControlButton
							onClick={() => {this.props.toggleStatusVacancyFunc(this.props.projectId, this.props.vacancyId)}}
							active={data.status ? null : 'active'}>
							{data.status ? 'Закрыть вакансию' : 'Открыть вакансию'}
						</DefaultTheme.ControlButton>
						<DefaultTheme.ControlButton
							onClick={() => {this.props.deleteVacancyFunc(this.props.projectId, this.props.vacancyId)}}
							>Удалить
						</DefaultTheme.ControlButton>
					</DefaultTheme.ControlBox>
				</DefaultTheme.Row>
			</Wrapper>
		)
	}
}

export default VacancyCard;