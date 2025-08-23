import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Inject the custom styles from the original HTML
    const style = document.createElement('style');
    style.textContent = `
      body {
        font-family: 'Roboto', Arial, sans-serif;
      }
      .audio-bar {
        background: linear-gradient(90deg, #e5e7eb 0%, #e5e7eb 80%, #e5e7eb 100%);
        border-radius: 6px;
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 12px;
      }
      .audio-wave {
        height: 16px;
        width: 180px;
        background: url('https://placehold.co/180x16/eeeeee/cccccc?text=') repeat-x;
        border-radius: 3px;
        margin: 0 10px;
      }
      .header-logo {
        height: 40px !important;
        max-height: 40px !important;
        min-height: 40px !important;
      }
      @media (min-width: 400px) {
        .header-logo {
          height: 48px !important;
          max-height: 48px !important;
          min-height: 48px !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Inject the date/time script functionality
    function pad2(n: number): string { 
      return n < 10 ? '0' + n : n.toString(); 
    }
    
    function formatarDataHoraBR(date: Date): string {
      const dia = pad2(date.getDate());
      const mes = pad2(date.getMonth() + 1);
      const ano = String(date.getFullYear()).slice(-2);
      const hora = pad2(date.getHours());
      const min = pad2(date.getMinutes());
      return `${dia}/${mes}/${ano} às ${hora}:${min}`;
    }

    const agora = new Date();
    const publicado = formatarDataHoraBR(agora);
    // Simula atualização 1 minuto depois
    const atualizadoDate = new Date(agora.getTime() + 1 * 60000);
    const atualizado = formatarDataHoraBR(atualizadoDate);
    const dataHoraElement = document.getElementById('data-hora-atual');
    if (dataHoraElement) {
      dataHoraElement.textContent = `${publicado} | Atualizado ${atualizado}`;
    }

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const htmlContent = `
    <div class="bg-white text-black">
      <!-- Header -->
      <div class="w-full bg-black flex items-center px-2 py-2 fixed top-0 left-0 z-50" style="height: 40px; min-height: 40px; max-height: 40px;">
        <button class="text-white text-xl mr-2" data-testid="button-menu">
          <i class="fas fa-bars"></i>
        </button>
        <img alt="CNN Brasil logo" class="header-logo w-auto mr-auto" src="https://www.cnnbrasil.com.br/images/log-cnn-brasil-transparent.svg?w=117&h=116&crop=1" style="object-fit: contain;" data-testid="img-logo"/>
        <button class="text-white text-lg mx-2" data-testid="button-search">
          <i class="fas fa-search"></i>
        </button>
        <button class="flex items-center text-white text-lg" data-testid="button-gmail">
          <span class="mr-1 text-2xl font-black select-none" style="line-height:1;">|</span>
          <img alt="Logo do Gmail, envelope estilizado com cores vermelho, azul, verde e amarelo, símbolo do serviço de e-mail do Google" class="w-6 h-6 object-contain" src="https://static.vecteezy.com/system/resources/previews/022/613/021/non_2x/google-mail-gmail-icon-logo-symbol-free-png.png"/>
        </button>
      </div>
      <div class="h-10"></div>
      <!-- Section Button -->
      <div class="px-4 pt-3">
        <button class="bg-[#2d3a4a] text-white text-xs font-bold rounded px-3 py-1 mb-2" data-testid="button-politica">
          Política
        </button>
      </div>
      <!-- Starlink Banner Full Width -->
      <div class="w-full mb-3">
        <img alt="Banner retangular da Starlink, fundo escuro com antena e texto promocional em português" class="w-full" src="https://i.ibb.co/gFV4DdHF/IMG-6522.jpg" style="display:block;max-width:100%;height:auto;" data-testid="img-banner"/>
      </div>
      <!-- Main Title -->
      <div class="px-4">
        <h1 class="text-2xl font-black leading-tight mb-2" style="font-family: 'Roboto', Arial, sans-serif;" data-testid="text-title">
          Voa Brasil: Saiba como participar do programa de passagens aéreas a R$200
        </h1>
        <p class="text-base font-normal mb-3" data-testid="text-subtitle">
          Programa do governo federal oferece passagens aéreas de ida e volta por R$200 para quem recebe até 5 salários mínimos. Veja como funciona e quem pode participar.
        </p>
        <p class="text-xs text-gray-700 mb-2" data-testid="text-source">
          Da CNN
        </p>
        <p class="text-xs text-gray-500 mb-3" id="data-hora-atual" data-testid="text-datetime">
          <!-- Data e hora serão inseridas via JS -->
        </p>
      </div>
      <!-- Video -->
      <div class="px-4 mb-2">
        <div class="w-full rounded-lg overflow-hidden">
          <img alt="Frame de reportagem da CNN sobre o programa Voa Brasil, com destaque para avião comercial e texto: PASSAGENS AÉREAS A R$200 PARA QUEM RECEBE ATÉ 5 SALÁRIOS MÍNIMOS" class="w-full h-auto" height="180" src="https://replicate.delivery/xezq/1UAo9XDN8RaeMy0o4MNr1ob7ikfah1SDwRgY6fj81wMSCAaqA/out-0.png" width="320" data-testid="img-video"/>
        </div>
      </div>
      <!-- Share Button -->
      <div class="px-4 mb-2">
        <div class="flex items-center border-b border-gray-200 pb-2">
          <span class="text-[#c00] text-lg mr-2">
            <i class="fas fa-share-alt"></i>
          </span>
          <span class="text-base font-bold" data-testid="text-share">
            Compartilhar matéria
          </span>
        </div>
      </div>
      <!-- Audio Player -->
      <div class="px-4 mb-2">
        <p class="text-xs text-gray-700 mb-1" data-testid="text-audio-label">
          ouvir notícia
        </p>
        <div class="flex items-center audio-bar mb-2">
          <button class="text-[#c00] text-lg mr-2" data-testid="button-play">
            <i class="fas fa-play"></i>
          </button>
          <div class="audio-wave"></div>
          <span class="text-xs text-gray-700 mr-2" data-testid="text-audio-time">
            0:00
          </span>
          <span class="bg-gray-200 text-gray-700 text-xs px-1.5 py-0.5 rounded" data-testid="text-audio-speed">
            1.0x
          </span>
        </div>
      </div>
      <!-- Article Body -->
      <div class="px-4 text-base leading-relaxed">
        <p class="mb-4" data-testid="text-paragraph-1">
          O
          <b class="text-[#c00]">
            Voa Brasil
          </b>
          é um programa do governo federal criado para democratizar o acesso ao transporte aéreo no país. A iniciativa permite que pessoas que recebem até
          <b class="text-[#c00]">
            5 salários mínimos
          </b>
          possam comprar passagens aéreas de ida e volta por apenas
          <b class="text-[#c00]">
            R$200
          </b>
          cada.
        </p>
        <p class="mb-4" data-testid="text-paragraph-2">
          O objetivo do programa é facilitar o deslocamento de milhões de brasileiros, promovendo inclusão social e estimulando o turismo nacional. O <span class="text-[#c00] font-bold">Voa Brasil</span> é voltado especialmente para quem não viajou de avião nos últimos 12 meses.
        </p>
      </div>
      <!-- Botão de Cadastro -->
      <div class="flex justify-center my-6">
        <a class="bg-[#c00] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-[2px] text-base shadow-lg transition" href="https://voabrasil.gov.br" target="_blank" data-testid="link-cadastro">
          Cadastre-se no <span class="text-white">Voa Brasil</span>
        </a>
      </div>
      <!-- Starlink Banner Full Width (again) -->
      <div class="w-full mb-2">
        <img alt="Banner retangular da Starlink, fundo escuro com antena e texto promocional em português" class="w-full" src="https://i.ibb.co/gFV4DdHF/IMG-6522.jpg" style="display:block;max-width:100%;height:auto;" data-testid="img-banner-2"/>
      </div>
      <!-- Article Body Continued -->
      <div class="px-4 text-base leading-relaxed">
        <h2 class="text-lg font-black mb-2 mt-4" data-testid="text-heading-participar">
          Quem pode participar do <span class="text-[#c00]">Voa Brasil</span>?
        </h2>
        <p class="mb-4" data-testid="text-participar-intro">
          Para participar do programa, é necessário:
        </p>
        <ul class="list-disc pl-6 mb-4" data-testid="list-requisitos">
          <li class="mb-1">
            Ter renda mensal de até
            <b class="text-[#c00]">
              5 salários mínimos
            </b>
            (R$7.060 em 2024);
          </li>
          <li class="mb-1">
            Não ter realizado viagem de avião nos últimos 12 meses;
          </li>
          <li class="mb-1">
            Estar com CPF regularizado.
          </li>
        </ul>
        <h2 class="text-lg font-black mb-2 mt-4" data-testid="text-heading-beneficio">
          Como funciona o benefício?
        </h2>
        <p class="mb-4" data-testid="text-beneficio-1">
          Cada pessoa cadastrada poderá comprar até
          <b class="text-[#c00]">
            2 passagens aéreas por ano
          </b>
          , com direito a ida e volta, pagando
          <b class="text-[#c00]">
            R$200
          </b>
          por cada trecho. O valor é fixo e não inclui taxas de embarque.
        </p>
        <p class="mb-4" data-testid="text-beneficio-2">
          As passagens podem ser adquiridas diretamente pelo site do programa, após o cadastro e validação dos dados. O benefício é pessoal e intransferível.
        </p>
        <h2 class="text-lg font-black mb-2 mt-4" data-testid="text-heading-importancia">
          Por que o <span class="text-[#c00]">Voa Brasil</span> é importante?
        </h2>
        <p class="mb-4" data-testid="text-importancia">
          O <span class="text-[#c00] font-bold">Voa Brasil</span> busca ampliar o acesso ao transporte aéreo, permitindo que mais brasileiros possam viajar pelo país a preços acessíveis. A medida também estimula o turismo, gera empregos e movimenta a economia nacional.
        </p>
      </div>
      <!-- Related News -->
      <div class="px-4 mb-4">
        <div class="flex items-center border-t border-gray-200 pt-3 mb-2">
          <img alt="Foto de Marcos do Val, senador alvo da PF que está usando tornozeleira eletrônica" class="w-14 h-14 rounded object-cover mr-3" height="60" src="https://replicate.delivery/xezq/n2w19bWiPfXAMSG1oLlQofrfAE7diwyV8QJ0F5rMLVzrQfzUB/out-0.png" width="60" data-testid="img-related-1"/>
          <div>
            <p class="text-xs font-bold leading-tight mb-1" data-testid="text-related-1">
              Quem é Marcos do Val, senador alvo da PF que está usando tornozeleira eletrônica
            </p>
          </div>
        </div>
        <div class="flex items-center border-t border-gray-200 pt-3">
          <img alt="Foto de político brasileiro, Quatro frentes do governo brasileiro para reagir ao tarifação de Trump" class="w-14 h-14 rounded object-cover mr-3" height="60" src="https://replicate.delivery/xezq/Cff5yp6hmIk7J0bbl4OE9e5bGDTTPufnZJYrCW5EZhuXhenpC/out-0.png" width="60" data-testid="img-related-2"/>
          <div>
            <p class="text-xs font-bold leading-tight mb-1" data-testid="text-related-2">
              Quatro frentes do governo brasileiro para reagir ao tarifação de Trump
            </p>
          </div>
        </div>
      </div>
      <!-- Footer Melhorado -->
      <footer class="w-full bg-black px-4 pt-8 pb-6">
        <div class="flex flex-col items-center">
          <img alt="CNN Brasil logo" class="h-10 w-auto mb-3" height="40" src="https://www.cnnbrasil.com.br/images/log-cnn-brasil-transparent.svg?w=117&h=116&crop=1" style="object-fit: contain;" width="90" data-testid="img-footer-logo"/>
          <div class="flex flex-wrap justify-center gap-4 mb-4">
            <a class="text-gray-300 text-xs hover:text-white transition" href="#" data-testid="link-sobre">
              Sobre
            </a>
            <a class="text-gray-300 text-xs hover:text-white transition" href="#" data-testid="link-publicidade">
              Publicidade
            </a>
            <a class="text-gray-300 text-xs hover:text-white transition" href="#" data-testid="link-contato">
              Contato
            </a>
            <a class="text-gray-300 text-xs hover:text-white transition" href="#" data-testid="link-privacidade">
              Política de Privacidade
            </a>
            <a class="text-gray-300 text-xs hover:text-white transition" href="#" data-testid="link-termos">
              Termos de Uso
            </a>
          </div>
          <div class="flex space-x-4 mb-4">
            <a class="text-gray-300 hover:text-white text-lg" href="#" data-testid="link-facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a class="text-gray-300 hover:text-white text-lg" href="#" data-testid="link-twitter">
              <i class="fab fa-twitter"></i>
            </a>
            <a class="text-gray-300 hover:text-white text-lg" href="#" data-testid="link-instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a class="text-gray-300 hover:text-white text-lg" href="#" data-testid="link-youtube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
          <p class="text-xs text-gray-400 mb-1" data-testid="text-copyright">
            © 2024 CNN Brasil. Todos os direitos reservados.
          </p>
          <p class="text-xs text-white font-bold" data-testid="text-slogan">
            Pense bem, pense CNN.
          </p>
        </div>
      </footer>
    </div>
  `;

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}
