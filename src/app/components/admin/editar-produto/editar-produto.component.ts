import { Component, OnInit  } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Produto} from '../../../model/produto';
import {ActivatedRoute, Router} from '@angular/router';
import {Button} from 'primeng/button';
import {ProdutosService} from '../../../service/produtos.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-editar-produto',
  imports: [
    FormsModule,
    InputNumber,
    Button,
    InputTextModule,
    NgIf
  ],
  templateUrl: './editar-produto.component.html',
  styleUrl: './editar-produto.component.scss'
})
export class EditarProdutoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private router: Router,
              private produtoService: ProdutosService) { }

  produto!: Produto;

  ngOnInit(): void {
    const codigo = Number(this.route.snapshot.paramMap.get('codigo'));

    const produtoEncontrado = this.produtoService.getProdutoByCodigo(codigo);

    if (!produtoEncontrado) {
      alert("Produto não encontrado!");
      this.router.navigate(['admin/home']);
      return;
    }

    this.produto = { ...produtoEncontrado };
  }

  salvar() {
    this.produtoService.atualizarProduto(this.produto);
    this.router.navigate(['admin/home']);
  }

  cancelar() {
    this.router.navigate(['admin/home']);
  }

}
