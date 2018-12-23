import React, { Component } from "react";
import * as DefaultTheme from '../theme/DefaultTheme';
import styled from 'styled-components';

const Wrapper = styled.div`
	background-color: rgba(0, 0, 0, 0.57);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    overflow-x: hidden;
    z-index: 1000;
    padding: 1.2rem;
`;
const Container = styled.div`
	width: 100%;
	max-width: 600px;
	border-radius: 3px;
	box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.24), 0 0 24px 0 rgba(0, 0, 0, 0.12);
	position: relative;
    padding: 1.5rem;
    background: #ffffff;
    background-clip: padding-box;
`;
const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
const Title = styled.div`
	font-size: 1.1875rem;
	line-height: 1.47;
`;
const Close = styled.span`
	position: relative;
	display: inline-block;
	width: 0.875rem;
	height: 0.875rem;
	overflow: hidden;
	&:hover {
		&::before, &::after {
			background-color: #808080;
		}
	}	
	&:active {
		&::before, &::after {
			background-color: #373737;
		}
	}	
	&::before, &::after {
		content: '';
		position: absolute;
		height: 2px;
		width: 100%;
		top: 50%;
		left: 0;
		margin-top: -1px;
		background-color: #989898;
	}
	&::before {
		transform:  rotate(45deg);
	}
	&::after {
		transform: rotate(-45deg);
	}
`;
const Body = styled.div`
	display: flex;
	align-items: center;
	border-top: 1px solid rgba(0, 0, 0, 0.12);
	margin-top: 1rem;
	padding-top: 1.5rem;
	justify-content: space-between;
	@media screen and (max-width: 575px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
const Input = styled(DefaultTheme.Input)`
	max-width: 100%;
	margin-right: 0.5rem;
`;
const ConfirmButton = styled(DefaultTheme.Button)`
	max-width: 7.5rem;
	@media screen and (max-width: 575px) {
		margin-top: 1rem;
	}
`;


class ModalAdd extends Component {
	stopClick = (e) => {
		e.stopPropagation()
	};
	render() {
		let inputValue = '';
		return (
			this.props.open ?
				<Wrapper onClick={() =>{this.props.onClose()}}>
					<Container onClick={this.stopClick}>
						<Header>
							<Title>{this.props.modalType === 'project' ? 'Новый проект' : 'Новая вакансия'}</Title>
							<Close onClick={() =>{this.props.onClose()}}/>
						</Header>
						<Body>
							<Input
								placeholder={this.props.modalType === 'project' ? 'Название проекта' : 'Название вакансии'}
								onChange={(e) => {
									inputValue = e.target.value
								}}
							/>
							{this.props.modalType === 'project' ?
								<ConfirmButton onClick={() =>{this.props.addProject(inputValue)}}>СОЗДАТЬ</ConfirmButton>
								:
								<ConfirmButton
									onClick={
										() =>{
											this.props.addVacancy(inputValue, this.props.projectId);
											this.props.onClose();
										}
									}>
									СОЗДАТЬ
								</ConfirmButton>
							}

						</Body>
					</Container>
				</Wrapper>
			:
			null
		)
	}
}

export default ModalAdd;