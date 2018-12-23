import React, {Component} from 'react';
import * as DefaultTheme from './theme/DefaultTheme';
import ProjectCard from './components/ProjectCard';
import ModalAdd from './components/ModalAdd';
import styled from 'styled-components';

const Wrapper = styled.section`
	width: 100%;
	max-width: 1024px;
	padding: 3rem;
	@media screen and (max-width: 575px) {
		padding: 1rem;
	}
`;
const AppTitle = styled.h1`
	margin: 0;
	font-family: 'Akzidenz-Grotesk Pro Med', sans-serif;
	line-height: 0.78;
	color: #1a1818;
	font-size: 5.125rem;
	@media screen and (max-width: 575px) {
		font-size: 3rem;
	}
`;
const HeadApp = styled.div`
	margin-top: 4.75rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	@media screen and (max-width: 575px) {
		flex-direction: column;
		align-items: flex-start;
		margin-top: 2rem;
	}
`;
const SearchBox = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	@media screen and (max-width: 575px) {
		margin-bottom: 1rem;
	}
`;
const Checkbox = styled.label`
	display: flex;
	align-items: center;
	margin-left: 1rem;	
	cursor: pointer;
`;
const CheckboxInput = styled.input`
	opacity: 0;
    position: absolute;
    pointer-events: none;
`;
const CheckBoxCheck = styled.span`
	background: ${props => props.active ? "#00aa87" : "inherit"};
  	border: ${props => props.active ? "2px solid #00aa87" : "2px solid #a1a1a1"};
  	color: #fff;
	height: 20px;
    width: 20px;
    border-radius: 2px;
    text-align: center;    
    box-sizing: border-box;
    display: block;
    position: relative;
    &:after {
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: ${props => props.active ? "url(./img/checkbox.svg)" : null} 50% no-repeat;}
	}
`;
const CheckboxTitle = styled.h4`
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.87);
	margin: 0 0 0 0.5rem;
	font-weight: normal;
`;


class App extends Component {
	constructor() {
		super();
		this.state = {
			modalProjectOpen: false,
			filterString: '',
			filterCheck: false,
			projects: [
				{
					title: 'Название первого проекта',
					status: true,
					vacancies: [
						{
							title: 'Первая вакансия',
							status: true
						},
						{
							title: 'Вторая вакансия',
							status: true
						}
					]
				},
				{
					title: 'Название второго проекта',
					status: true,
					vacancies: [
						{
							title: 'Третья вакансия',
							status: true
						},
						{
							title: 'Четвертая вакансия',
							status: true
						}
					]
				},
				{
					title: 'Очень-очень длинное название третьего проекта, которое переносится на две строки',
					status: true,
					vacancies: [
						{
							title: 'Пятая вакансия',
							status: true
						},
						{
							title: 'Первая вакансия',
							status: true
						}
					]
				},
			],
		}
	}


	deleteProject = (id) => {
		const projects = [...this.state.projects];
		projects.splice(id, 1);
		this.setState({projects});
	};
	deleteVacancy = (projectId, VacancyId) => {
		const projects = [...this.state.projects];
		const vacancies = [...projects[projectId].vacancies];
		vacancies.splice(VacancyId, 1);
		projects[projectId] = {
			...projects[projectId],
			vacancies: vacancies
		};
		this.setState({projects});
	};
	toggleStatusProject = (projectId) => {
		const projects = [...this.state.projects];
		projects[projectId] = {
			...projects[projectId],
			status: !projects[projectId].status
		};
		this.setState({projects});
	};
	toggleStatusVacancy = (projectId, vacancyId) => {
		const projects = [...this.state.projects];
		const vacancies = [...projects[projectId].vacancies];
		vacancies[vacancyId] = {
			...vacancies[vacancyId],
			status: !vacancies[vacancyId].status
		};
		projects[projectId] = {
			...projects[projectId],
			vacancies: vacancies
		};
		this.setState({projects});
	};
	onOpenModalAddProject = () => {
		this.setState({modalProjectOpen: true});
	};
	onCloseModalAddProject = () => {
		this.setState({modalProjectOpen: false});
	};
	addProject = (projectName) => {
		const projects = [...this.state.projects];
		const newProject = {
			title: projectName,
			status: true,
			vacancies: []
		};
		projects.push(newProject);
		this.setState({projects});
		this.setState({modalProjectOpen: false});
	};
	addVacancy = (vacancyName, projectId) => {
		const projects = [...this.state.projects];
		const vacancies = [...projects[projectId].vacancies];
		const newVacancy = {
			title: vacancyName,
			status: true,
		};
		vacancies.push(newVacancy);
		projects[projectId] = {
			...projects[projectId],
			vacancies: vacancies
		};
		this.setState({projects});
	};
	handelInputSearch = () => {
		this.setState({
			filterString: this.search.value
		});
	};
	handelSearchCheck = () => {
		if (this.check.checked) {
			this.setState({
				filterCheck: true
			})
		} else {
			this.setState({
				filterCheck: false
			})
		}
	};

	render() {
		return (
			<Wrapper>
				<AppTitle>Список проектов</AppTitle>
				<HeadApp>
					<SearchBox>
						<DefaultTheme.Input
							placeholder={'Поиск по вакансиям'}
							onChange={this.handelInputSearch}
							ref={input => this.search = input}
						/>
						<Checkbox>
							<div>
								<CheckboxInput
									type="checkbox"
									onChange={this.handelSearchCheck}
									ref={input => this.check = input}
								/>
								<CheckBoxCheck
									active={this.state.filterCheck ? 'active' : null}
								/>
							</div>
							<CheckboxTitle>Только открытые</CheckboxTitle>
						</Checkbox>
					</SearchBox>
					<DefaultTheme.Button
						onClick={this.onOpenModalAddProject}>
						Добавить проект
					</DefaultTheme.Button>
				</HeadApp>
				{this.state.projects.map((item, index) => {
					return (
						<ProjectCard
							projectData={item}
							key={index.toString()}
							projectId={index}
							deleteProjectFunc={this.deleteProject}
							deleteVacancyFunc={this.deleteVacancy}
							toggleStatusProjectFunc={this.toggleStatusProject}
							toggleStatusVacancyFunc={this.toggleStatusVacancy}
							addVacancy={this.addVacancy}
							filterCheck={this.state.filterCheck}
							filterString={this.state.filterString}
							modalStatus={this.state.modalProjectOpen}
							madalOpen={this.onOpenModalAddProject}
							modalClose={this.onCloseModalAddProject}
						/>
					)
				})}
				<ModalAdd
					open={this.state.modalProjectOpen}
					onClose={this.onCloseModalAddProject}
					modalType={'project'}
					addProject={this.addProject}
				/>
			</Wrapper>
		);
	}
}

export default App;
