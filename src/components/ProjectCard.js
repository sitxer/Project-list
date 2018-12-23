import React, { Component } from "react";
import VacancyCard from '../components/VacancyCard';
import ModalAdd from './ModalAdd';
import * as DefaultTheme from '../theme/DefaultTheme';
import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: 3px;
	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.12);
	background-color: #ffffff;
	padding: 1rem 1.5rem;
	margin-top: 1rem;
	transition: 0.3s all;
`;
const Title = styled.h2`
	font-size: 1.4375rem;
	max-width: 38.4375rem;
	margin: 0;
	font-weight: normal;
	cursor: pointer;
	transition: 0.3s all;
	color: ${props => props.active ? "inherit" : "rgba(0, 0, 0, 0.57)"};
`;
const VacanciesInfo = styled.div`
	display: flex;
`;
const VacanciesCount = styled.h4`
	margin: 0 1rem 0 0;
	font-weight: normal;
	line-height: 1.5;
`;
class ProjectCard extends Component {
	constructor(){
		super();
		this.state = {
			open: false,
			modalStatus: false
		}
	}
	openCard = () => {
		this.setState({
			open: !this.state.open
		})
	};
	declOfNum = (number, titles) => {
		let cases = [2, 0, 1, 1, 1, 2];
		return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
	};
	onOpenModalAddProject = () => {
		this.setState({ modalStatus: true });
	};
	onCloseModalAddProject = () => {
		this.setState({ modalStatus: false });
	};
	render() {
		let data = this.props.projectData;
		let activeVacancy = 0;
		let vacancies =  data.vacancies.filter(item => this.props.filterString&&this.props.filterCheck?item.title.includes(this.props.filterString)&&item.status:item.title.includes(this.props.filterString)).map((item, index)=>{
			return (
				<VacancyCard
					key={index.toString()}
					vacancyData={item}
					vacancyId={index}
					projectId={this.props.projectId}
					deleteVacancyFunc={this.props.deleteVacancyFunc}
					toggleStatusVacancyFunc={this.props.toggleStatusVacancyFunc}
				/>
			)});
		if (vacancies.length < 1){
			return null;
		}
		data.vacancies.map((item) => {
			if (item.status) {
				activeVacancy++
			}
			return null
		});
		return (
			<Wrapper>
				<Title
					onClick={() =>{this.openCard()}}
					active={data.status ? 'active' : null}
				>
					{data.title}
				</Title>
				<DefaultTheme.Row>
					<VacanciesInfo>
						<VacanciesCount>
							{activeVacancy} {this.declOfNum(activeVacancy, ['вакансия', 'вакансии', 'вакансий'])}
						</VacanciesCount>
						<DefaultTheme.ControlButton
							active
							onClick={this.onOpenModalAddProject}
						>Добавить вакансию
						</DefaultTheme.ControlButton>
					</VacanciesInfo>
					<DefaultTheme.ControlBox>
						<DefaultTheme.ControlButton
							active={data.status ? null : 'active'}
							onClick={() => {this.props.toggleStatusProjectFunc(this.props.projectId)}}
						>
							{data.status ? 'Закрыть проект' : 'открыть проект'}
						</DefaultTheme.ControlButton>
						<DefaultTheme.ControlButton
							onClick={() =>{this.props.deleteProjectFunc(this.props.projectId)}}
						>
							Удалить
						</DefaultTheme.ControlButton>
					</DefaultTheme.ControlBox>
				</DefaultTheme.Row>
				{this.state.open ?
					vacancies.map(item=>item)
					:
					null
				}
				<ModalAdd
					open={this.state.modalStatus}
					modalType={'vacancy'}
					onClose={this.onCloseModalAddProject}
					projectId={this.props.projectId}
					addVacancy={this.props.addVacancy}
				/>
			</Wrapper>
		)
	}
}

export default ProjectCard;