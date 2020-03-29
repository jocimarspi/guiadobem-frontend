import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./ModalNovoParceiro.css";
import api from "../services/api";

export default function ModalNovoParceiro(props) {
  const [cidadeId, setcidadeId] = useState("");
  const [categoriaId, setcategoriaId] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [responsavel, setResponsavel] = useState("");

  async function incluirNovoParceiro(event) {
    event.preventDefault();
    const parceiro = {};
    parceiro.nome = nome;
    parceiro.tipo = tipo;
    parceiro.telefone = telefone;
    parceiro.whatsapp = whatsapp;
    parceiro.responsavel = responsavel;
    parceiro.publicar = true;
    parceiro.cidadeId = cidadeId;
    parceiro.categoriaId = categoriaId;
    console.log(parceiro);
    const response = await api.post("/estabelecimentos", parceiro);

    if (response.status === 201) {
      window.location.reload();
    }

    setcidadeId("");
    setcategoriaId("");
    setNome("");
    setTipo("");
    setTelefone("");
    setwhatsapp("");
    setResponsavel("");
    props.clicouFechar();
  }

  return (
    <Modal
      show={props.exibirModal}
      onHide={props.clicouFechar}
      animation={true}
    >
      <Modal.Header>
        <Modal.Title>Novo Parceiro</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={incluirNovoParceiro}>
          <Form.Group>
            <Form.Control
              as="select"
              value={cidadeId}
              required
              onChange={e => setcidadeId(e.target.key)}
            >
              <option value="" disabled hidden>
                Selecione uma Cidade
              </option>
              <option key="1">Maringá</option>
              <option key="2">Campo Grande</option>
              <option key="3">Presidente Prudente</option>
              <option key="4">Outras</option>
            </Form.Control>
            <Form.Control
              as="select"
              value={categoriaId}
              required
              onChange={e => setcategoriaId(e.target.value)}
            >
              <option value="" disabled hidden>
                Selecione uma Categoria
              </option>
              <option key="1">Horti-fruti</option>
              <option key="2">Confeitaria</option>
              <option key="3">Serviços</option>
              <option key="4">Outros Itens</option>
            </Form.Control>
            <Form.Control
              type="text"
              value={nome}
              required
              placeholder="Digite o nome"
              onChange={e => setNome(e.target.value)}
            />
            <Form.Control
              type="text"
              value={tipo}
              required
              placeholder="Tipo produto/serviço"
              onChange={e => setTipo(e.target.value)}
            />
            <Form.Control
              type="text"
              value={telefone}
              required
              placeholder="Telefone"
              onChange={e => setTelefone(e.target.value)}
            />
            <Form.Control
              type="text"
              value={whatsapp}
              required
              placeholder="WhatsApp"
              onChange={e => setwhatsapp(e.target.value)}
            />
            <Form.Control
              type="text"
              value={responsavel}
              required
              placeholder="Responsável"
              onChange={e => setResponsavel(e.target.value)}
            />
          </Form.Group>
          <Button variant="secondary" onClick={props.clicouFechar}>
            Cancelar
          </Button>
          {"  "}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
