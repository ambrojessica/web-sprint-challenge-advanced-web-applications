import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const testingArticle = {
  id: 1,
  createdOn: '12/17/2021',
  headline: 'test headline',
  author: 'test author',
  summary: 'test summary',
  body: 'test body'
};

const articleNoAuthor = {
  id: 1,
  createdOn: '12/17/2021',
  headline: 'test headline',
  author: '',
  summary: 'test summary',
  body: 'test body'
};

test('renders component without errors', () => {
  render(<Article article={testingArticle} />);
});

test('renders headline, author from the article when passed in through props', () => {
  render(<Article article={testingArticle} />);

  const headline = screen.getByTestId(/headline/i);
  expect(headline).toBeInTheDocument();

  const author = screen.getByTestId(/author/i);
  expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', () => {
  render(<Article article={testingArticle} article={articleNoAuthor} />);

  const author = screen.getByTestId(/author/i);
  expect(author).toBeInTheDocument();
  expect(author).toHaveTextContent('Associated Press');

});

test('executes handleDelete when the delete button is pressed', () => {
  const handleDelete = jest.fn();

  render(<Article article={testingArticle} handleDelete={handleDelete} />);

  const deleteBtn = screen.getByTestId('deleteButton');
  userEvent.click(deleteBtn);
  expect(handleDelete).toBeCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.