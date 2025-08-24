import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Inject the custom styles from the original HTML
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'CustomFont';
        src: url('/attached_assets/8117a33218787fa7-s.p_1755907817528.woff2') format('woff2');
        font-weight: 300;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'CustomFont';
        src: url('/attached_assets/adf4fb6ca97b7f48-s.p_1755907817528.woff2') format('woff2');
        font-weight: 400;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'CustomFont';
        src: url('/attached_assets/b1fe131f39c57354-s.p_1755907817529.woff2') format('woff2');
        font-weight: 600;
        font-style: normal;
        font-display: swap;
      }
      @font-face {
        font-family: 'CustomFont';
        src: url('/attached_assets/dc0de1ec3c6f7186-s.p_1755907817529.woff2') format('woff2');
        font-weight: 900;
        font-style: normal;
        font-display: swap;
      }
      
      body {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 300;
      }
      
      h1, h2, .font-black {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 900 !important;
      }
      
      h2 {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif !important;
        font-weight: 900 !important;
        font-style: normal !important;
      }
      
      h2.text-lg {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif !important;
        font-weight: 900 !important;
        font-style: normal !important;
      }
      
      [data-testid="text-heading-participar"],
      [data-testid="text-heading-beneficio"], 
      [data-testid="text-heading-importancia"] {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif !important;
        font-weight: 900 !important;
        font-style: normal !important;
      }
      
      .font-bold, b, strong {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 600 !important;
      }
      
      .font-normal, p {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 300 !important;
      }
      
      .text-xs, .text-sm {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 300;
      }
      
      .text-base {
        font-family: 'CustomFont', 'Roboto', Arial, sans-serif;
        font-weight: 300 !important;
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
        height: 46px !important;
        max-height: 46px !important;
        min-height: 46px !important;
        object-fit: contain !important;
      }
      
      .video-clean {
        position: relative;
        cursor: pointer;
      }
      
      .video-clean::-webkit-media-controls-panel {
        display: none !important;
        opacity: 1 !important;
      }
      
      .video-clean::-webkit-media-controls-play-button {
        display: none !important;
        opacity: 1 !important;
      }
      
      .video-clean::-webkit-media-controls-start-playback-button {
        display: none !important;
        opacity: 1 !important;
      }
      
      .video-clean.show-controls::-webkit-media-controls-panel {
        display: flex !important;
      }
      
      .video-clean.show-controls::-webkit-media-controls-play-button {
        display: block !important;
      }
      
      .video-clean.show-controls::-webkit-media-controls-start-playback-button {
        display: block !important;
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

    // Video controls functionality
    const setupVideoControls = () => {
      const video = document.querySelector('[data-testid="video-voa-brasil"]') as HTMLVideoElement;
      if (video) {
        let controlsTimeout: NodeJS.Timeout;
        
        const showControls = () => {
          video.setAttribute('controls', 'true');
          video.classList.add('show-controls');
          
          // Hide controls after 3 seconds of no interaction
          clearTimeout(controlsTimeout);
          controlsTimeout = setTimeout(() => {
            video.removeAttribute('controls');
            video.classList.remove('show-controls');
          }, 3000);
        };
        
        const hideControls = () => {
          clearTimeout(controlsTimeout);
          controlsTimeout = setTimeout(() => {
            video.removeAttribute('controls');
            video.classList.remove('show-controls');
          }, 100);
        };
        
        // Show controls when clicking on video
        video.addEventListener('click', showControls);
        video.addEventListener('touchstart', showControls);
        
        // Keep controls visible while hovering (desktop)
        video.addEventListener('mouseenter', showControls);
        video.addEventListener('mouseleave', hideControls);
        
        // Force video to autoplay with multiple attempts
        const forceAutoplay = async () => {
          try {
            // First try: play with sound
            video.muted = false;
            video.volume = 1.0;
            await video.play();
            console.log('Video started with sound');
          } catch (error1) {
            try {
              // Second try: play muted then unmute
              video.muted = true;
              await video.play();
              video.muted = false;
              video.volume = 1.0;
              console.log('Video started muted then unmuted');
            } catch (error2) {
              console.log('Video autoplay failed, will start on user interaction');
              // Enable on any user interaction
              const startVideo = () => {
                video.muted = false;
                video.volume = 1.0;
                video.play();
                document.removeEventListener('click', startVideo);
                document.removeEventListener('touchstart', startVideo);
                document.removeEventListener('keydown', startVideo);
              };
              document.addEventListener('click', startVideo, { once: true });
              document.addEventListener('touchstart', startVideo, { once: true });
              document.addEventListener('keydown', startVideo, { once: true });
            }
          }
        };
        
        // Try to start video as soon as possible
        if (video.readyState >= 2) {
          // Video already loaded enough data
          forceAutoplay();
        } else {
          // Wait for video to load
          video.addEventListener('loadeddata', forceAutoplay);
          video.addEventListener('canplay', forceAutoplay);
        }
        
        // Additional safety check - retry every second for first 5 seconds
        let retryCount = 0;
        const retryInterval = setInterval(() => {
          if (video.paused && retryCount < 5) {
            console.log(`Retry ${retryCount + 1}: attempting to play video`);
            forceAutoplay();
            retryCount++;
          } else {
            clearInterval(retryInterval);
          }
        }, 1000);
      }
    };
    
    // Setup video controls after a short delay to ensure video element exists
    setTimeout(setupVideoControls, 100);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const htmlContent = `
    <div class="bg-white text-black">
      <!-- Header -->
      <div class="w-full bg-black flex items-center px-2 py-2 fixed top-0 left-0 z-50" style="height: 50px; min-height: 50px; max-height: 50px;">
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
      <div class="h-12"></div>
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
        <div class="w-full overflow-hidden">
          <video class="w-full h-auto video-clean" width="320" height="180" autoplay loop playsinline webkit-playsinline data-testid="video-voa-brasil">
            <source src="/attached_assets/copy_C64C9D04-ABE4-49AB-B939-BB03FBCAD1B6_1755907531565.mp4" type="video/mp4">
            Seu navegador não suporta a tag de vídeo.
          </video>
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
            R$200,00
          </b>
          por viagem completa (ida e volta).
        </p>

        
      </div>
      <!-- Starlink Banner Full Width (again) -->
      <div class="w-full mb-2">
        <img alt="Banner retangular da Starlink, fundo escuro com antena e texto promocional em português" class="w-full" src="https://i.ibb.co/gFV4DdHF/IMG-6522.jpg" style="display:block;max-width:100%;height:auto;" data-testid="img-banner-2"/>
      </div>
      <!-- Article Body Continued -->
      <div class="px-4 text-base leading-relaxed">
        <h2 class="text-xl font-black leading-tight mb-2 mt-4" style="font-family: 'Roboto', Arial, sans-serif; font-weight: 900 !important;" data-testid="text-heading-participar">
          <strong> Como participar do programa?</strong> 
        </h2>
        <p class="mb-4" data-testid="text-participar-intro">
          Para participar do programa, é necessário:
        </p>
        <ul class="list-disc pl-6 mb-4" data-testid="list-requisitos">
          <li class="mb-1">
            Clicar no botão abaixo e realizar o cadastro no site do programa;
          
          </li>
          <li class="mb-1">
            Pagar a Taxa de Inscrição;
          </li>
          <li class="mb-1">
            Estar com CPF regularizado.
          </li>
        </ul>
        <!-- Botão de Cadastro -->
        <div class="flex justify-center my-6">
          <a class="bg-[#c00] hover:bg-red-700 text-white font-bold py-2 px-6 rounded-[2px] text-base shadow-lg transition" href="https://voabrasil.gov.br" target="_blank" data-testid="link-cadastro">
            Cadastre-se no <span class="text-white">Voa Brasil</span>
          </a>
        </div>
        <h2 class="text-xl font-black leading-tight mb-2 mt-4" style="font-family: 'Roboto', Arial, sans-serif; font-weight: 900 !important;" data-testid="text-heading-beneficio">
         <strong> Como funciona o benefício? </strong>
        </h2>
        <p class="mb-4" data-testid="text-beneficio-1">
          Cada pessoa cadastrada poderá comprar até 2 passagens aéreas por ano pagando apenas R$200,00 por viagem completa (ida e volta)
          </b>
          . O valor é fixo e não inclui taxas de embarque. <b>Isso representa uma economia de até 80% comparado aos preços regulares!</b>
        </p>
        <p class="mb-4" data-testid="text-beneficio-2">
          As passagens podem ser adquiridas diretamente pelo site do programa, após o cadastro e validação dos dados. O benefício é pessoal e intransferível.
        </p>
        <h2 class="text-xl font-black leading-tight mb-2 mt-4" style="font-family: 'Roboto', Arial, sans-serif; font-weight: 900 !important;" data-testid="text-heading-importancia">
          <strong> Por que o Voa Brasil é importante? </strong>
        </h2>
        <p class="mb-4" data-testid="text-importancia">
          O <span class="text-[#c00] font-bold">Voa Brasil</span> revoluciona o transporte aéreo nacional ao aproveitar a alta disponibilidade de assentos nos voos domésticos. Com milhares de assentos ociosos diariamente, o governo criou esta oportunidade única para que famílias brasileiras realizem o sonho de voar. Além de democratizar o acesso aos céus, o programa aquece o turismo nacional e gera empregos em todo o país.
        </p>
      </div>
      <!-- Related News -->
      <div class="px-4 mb-4">
        <div class="flex items-center border-t border-gray-200 pt-3 mb-2">
          <img alt="Foto de Marcos do Val, senador alvo da PF que está usando tornozeleira eletrônica" class="w-14 h-14 rounded object-cover mr-3" height="60" src="https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/06/marcos_do_val_30.jpg?w=1200&h=1200&crop=1"/>
          <div>
            <p class="text-xs font-bold leading-tight mb-1" data-testid="text-related-1">
              Quem é Marcos do Val, senador alvo da PF que está usando tornozeleira eletrônica
            </p>
          </div>
        </div>
        <div class="flex items-center border-t border-gray-200 pt-3">
          <img alt="Foto de político brasileiro, Quatro frentes do governo brasileiro para reagir ao tarifação de Trump" class="w-14 h-14 rounded object-cover mr-3" height="60" src="https://s2-oglobo.glbimg.com/4ldcL7h9iBE4MSBpyW_g6e0394c=/0x0:6135x4090/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2025/H/h/VsIBcrTgAji1Gn9QnEDA/112060574-us-president-donald-trump-speaks-during-a-meeting-with-ukrainian-president-volodymyr-zelen.jpg"/>
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
