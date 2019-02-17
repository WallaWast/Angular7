import { Component, OnInit } from '@angular/core';

import { CalculadoraService } from '../services';

@Component({
	selector: 'app-calculadora',
	templateUrl: './calculadora.component.html',
	styleUrls: ['./calculadora.component.css']
})
export class CalculadoraComponent implements OnInit {

	private numero1: string;
	private numero2: string;
	private resultado: number;
	private operacao: string;

	constructor(private calculadoraService: CalculadoraService) { }

	ngOnInit() {
		this.limpar();
	}

	/**
	 * Limpa para o valor padrão
	 * 
	 * @returns void
	 */
	limpar(): void {
		this.numero1 = '0';
		this.numero2 = null;
		this.resultado = null;
		this.operacao = null;
	}

	/**
	 * 
	 * @param numero string número
	 * @returns void
	 */
	adicionarNumero(numero: string): void {
		if (this.operacao === null) {
			this.numero1 = this.concatenarNumero(this.numero1, numero);
		}
		else {
			this.numero2 = this.concatenarNumero(this.numero2, numero);
		}
	}

	/**
	 * Concatena os números
	 * @param numAtual string
	 * @param numConcat string
	 * @returns string
	 */
	concatenarNumero(numAtual: string, numConcat: string): string {

		//caso seja '0' ou null, reinicia o valor
		if (numAtual === '0' || numAtual === null) {
			numAtual = '';
		}

		//primeiro digito é '.', concatena '0' antes do ponto
		if (numConcat === '.' && numAtual === '') {
			return '0.';
		}

		//caso '.' digitado e já contenha um '.', não faz nada
		if (numConcat === '.' && numAtual.indexOf('.') > -1) {
			return numAtual;
		}

		return numAtual + numConcat;
	}

	/**
	 * Define a operação/ executa o calculo
	 * @param operacao string
	 * @returns void
	 */
	definirOperacao(operacao: string): void {
		//Apenas define a operação caso não exista ainda
		if (this.operacao === null) {
			this.operacao = operacao;
			return;
		}

		/*Caso a operação já exista e o número dois esteja selecionado, 
		executa o cálculo da operação*/
		if (this.numero2 !== null) {
			this.resultado = this.calculadoraService.calcular(
				parseFloat(this.numero1),
				parseFloat(this.numero2),
				this.operacao
			);

			this.operacao = operacao;
			this.numero1 = this.resultado.toString();
			this.numero2 = null;
			this.resultado = null;
		}
	}

	/**
	 * Executa o calculo
	 * @returns void
	 */
	calcular(): void {
		if (this.numero2 === null) {
			return;
		}

		this.resultado = this.calculadoraService.calcular(
			parseFloat(this.numero1),
			parseFloat(this.numero2),
			this.operacao);
	}

	/**
	 * Retorna o valor ser exibido na tela da calculadora
	 * @returns string
	 */
	get display(): string {
		if (this.resultado !== null) {
			return this.resultado.toString();
		}

		if (this.numero2 !== null) {
			return this.numero2;
		}

		return this.numero1;
	}

}
