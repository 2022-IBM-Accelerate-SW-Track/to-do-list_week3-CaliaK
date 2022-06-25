import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const dueDate2 = "06/30/2021";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i); //is not one will throw an error- so checks for one
  expect(check).toBeInTheDocument();
  const historyCheck = screen.getByTestId(/History Test/i).style.background//to make sure the first one, and not the second one is there
  expect(historyCheck).toBe("rgb(255, 255, 255)");
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  expect(screen.queryByText('05/30/2023')).not.toBeInTheDocument();
 });
 
 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const element = screen.getByRole('button', {name: /Add/i});
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.click(element);
  expect(screen.queryByText(/History Test/i)).not.toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i); 
  expect(check).toBeInTheDocument();
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox.checked).toEqual(false);
  fireEvent.click(checkbox);
  expect(screen.queryByText(/History Test/i)).not.toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const dueDate2 = "06/30/2021";
  fireEvent.change(inputTask, { target: { value: "Math Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate2}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i); //is not one will throw an error- so checks for one
  expect(check).toBeInTheDocument();
  const historyCheck = screen.getByTestId(/History Test/i).style.background//to make sure the first one, and not the second one is there
  expect(historyCheck).toBe("rgb(255, 255, 255)");
  const MathCheck = screen.getByTestId(/Math Test/i).style.background//to make sure the first one, and not the second one is there
  expect(MathCheck).toBe("rgb(255, 0, 0)");
 });
