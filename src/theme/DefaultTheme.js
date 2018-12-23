import styled from 'styled-components'

export const Button = styled.button`
	padding: 0.625rem 1rem;
 	width: 100%;
 	max-width: 13.4375rem;
 	
 	background-color: #00aa87;
 	box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 0 2px 0 rgba(0, 0, 0, 0.12);
 	
 	font-size: 0.875rem;
 	font-weight: 500;
 	color: #fff;
 	line-height: 1.14;
 	
 	
 	border: none;
 	border-radius: 2px;
 	
 	text-transform: uppercase;
 	transition: 0.3s all;
 	&:hover{
 		background-color: #00816c;
 		cursor: pointer;
 	}
 	&:active{
 		background-color: #00826c;
 	}
`;
export const Input = styled.input`
	width: 100%;
	max-width: 21.25rem;
	padding: 0.5rem 1rem;
	
	font-size: 1rem;
	line-height: 1.5;
	color: rgba(0, 0, 0, 0.87);
	
	border-radius: 2px;
	border: 1px solid #d4d4d4;
	transition: 0.3s all;		
	&::placeholder {
		color: rgba(0, 0, 0, 0.37);
	}
	&:hover, &:active, &:focus {
		border-color: #989898;
	}
`;
export const Row = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 0.5rem;
	@media screen and (max-width: 575px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
export const ControlBox = styled.div`
	width: 100%;
	max-width: 15rem;
	display: flex;
	justify-content: space-between;
	@media screen and (max-width: 575px) {
		margin-top: 1rem;
	}
`;
export const ControlButton = styled.button`
	cursor: pointer;
	border: unset;
	background-color: unset;
	padding: 0;
	text-transform: uppercase;
	color: ${props => props.active ? '#00aa87' : 'rgba(0, 0, 0, 0.37)'};
	font-size: 0.875rem;
	font-weight: 500;
	transition: 0.3s all;
	&:hover {
		color: #00816c;
	}
	&:active{
		color: #006554;
	}
`;