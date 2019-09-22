import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { empty } from 'rxjs';
import { Form, SubmitButton, List, Input, Error } from './styles';

import Container from '../../components/Container';
import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMsg: '',
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true, error: false });

    const { newRepo, repositories } = this.state;

    try {
      // verifica se ja EXISTE REPOSITORIO
      if (newRepo === '') throw new Error('Informe um repospitório');

      const achou = repositories.find(
        repos => repos.name.toLowerCase() === newRepo.toLowerCase()
      );

      if (achou) throw new Error('Repositório duplicado');

      // busca o repositorio no github
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (err) {
      this.setState({ error: true, errorMsg: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    const {
      state: { newRepo, loading, repositories, error, errorMsg },
      handleInputChange,
      handleSubmit,
    } = this;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="newRepo"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={handleInputChange}
            error={error}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        {error && <Error>{errorMsg}</Error>}

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
