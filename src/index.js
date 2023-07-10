import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
import { Leva } from 'leva'
import { Suspense } from 'react'

createRoot(document.getElementById('root')).render(
  <>
    <Suspense fallback={null}>
      <App />

      <div
        style={{
          position: 'absolute',
          pointerEvents: 'auto',
          bottom: '10vh',
          cursor: 'pointer',
          left: '50%',
          marginLeft: -140,
          width: 280,
          filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.5)) drop-shadow(0 0 3px rgba(255,255,255,0.2))'
        }}
        onClick={() => {
          window.open('https://answertree.ai', '_blank')
        }}>
        <svg height="100%" viewBox="0 0 415 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M70.188 38.4027C68.86 35.132 65.6827 32.9933 62.1533 32.9933H40.964L54.408 1.2823e-05H30.904C28.3947 1.2823e-05 26.1373 1.52266 25.1973 3.84799L0 66.208H23.2787C25.7867 66.208 28.044 64.6853 28.984 62.36L40.7067 33.3507L51.856 60.8C53.184 64.0693 56.3613 66.208 59.8907 66.208H81.4813L70.188 38.4027Z"
            fill="#3EA576"></path>
          <path
            d="M122.861 46.6063H106.171L103.41 54.5907H94.5849L109.653 12.6275H119.439L134.507 54.5907H125.622L122.861 46.6063ZM120.579 39.8825L114.516 22.3529L108.453 39.8825H120.579Z"
            fill="#0F172A"></path>
          <path
            d="M155.868 20.852C159.83 20.852 163.032 22.1127 165.473 24.6341C167.915 27.1155 169.135 30.5974 169.135 35.0799V54.5907H160.731V36.2205C160.731 33.5791 160.07 31.5579 158.75 30.1572C157.429 28.7164 155.628 27.996 153.347 27.996C151.025 27.996 149.184 28.7164 147.824 30.1572C146.503 31.5579 145.842 33.5791 145.842 36.2205V54.5907H137.438V21.3323H145.842V25.4746C146.963 24.0338 148.384 22.9132 150.105 22.1127C151.866 21.2723 153.787 20.852 155.868 20.852Z"
            fill="#0F172A"></path>
          <path
            d="M187.153 55.131C184.432 55.131 181.99 54.6507 179.829 53.6902C177.668 52.6896 175.947 51.3489 174.666 49.668C173.426 47.987 172.745 46.126 172.625 44.0849H181.09C181.25 45.3656 181.87 46.4262 182.951 47.2666C184.072 48.1071 185.452 48.5273 187.093 48.5273C188.694 48.5273 189.935 48.2071 190.815 47.5668C191.736 46.9264 192.196 46.106 192.196 45.1054C192.196 44.0248 191.636 43.2244 190.515 42.7041C189.435 42.1438 187.694 41.5435 185.292 40.9031C182.811 40.3028 180.77 39.6824 179.169 39.0421C177.608 38.4017 176.247 37.4212 175.087 36.1005C173.966 34.7797 173.406 32.9987 173.406 30.7575C173.406 28.9165 173.926 27.2356 174.967 25.7147C176.047 24.1939 177.568 22.9932 179.529 22.1127C181.53 21.2322 183.871 20.792 186.553 20.792C190.515 20.792 193.677 21.7925 196.038 23.7936C198.399 25.7547 199.7 28.4162 199.94 31.7781H191.896C191.776 30.4573 191.215 29.4168 190.215 28.6563C189.254 27.8559 187.954 27.4557 186.313 27.4557C184.792 27.4557 183.611 27.7358 182.771 28.2961C181.97 28.8564 181.57 29.6369 181.57 30.6374C181.57 31.7581 182.13 32.6185 183.251 33.2189C184.372 33.7792 186.113 34.3595 188.474 34.9598C190.875 35.5602 192.856 36.1805 194.417 36.8209C195.978 37.4612 197.319 38.4618 198.439 39.8225C199.6 41.1432 200.2 42.9042 200.24 45.1054C200.24 47.0265 199.7 48.7474 198.62 50.2683C197.579 51.7891 196.058 52.9898 194.057 53.8703C192.096 54.7107 189.795 55.131 187.153 55.131Z"
            fill="#0F172A"></path>
          <path
            d="M250.544 21.3323L240.818 54.5907H231.753L225.69 31.3578L219.627 54.5907H210.501L200.716 21.3323H209.241L215.124 46.6663L221.488 21.3323H230.372L236.616 46.6063L242.499 21.3323H250.544Z"
            fill="#0F172A"></path>
          <path
            d="M283.307 37.2411C283.307 38.4417 283.227 39.5223 283.067 40.4829H258.753C258.953 42.8842 259.794 44.7652 261.275 46.126C262.755 47.4868 264.576 48.1671 266.738 48.1671C269.859 48.1671 272.081 46.8264 273.401 44.1449H282.466C281.506 47.3467 279.665 49.9881 276.943 52.0693C274.222 54.1104 270.88 55.131 266.918 55.131C263.716 55.131 260.834 54.4306 258.273 53.0298C255.751 51.589 253.77 49.5679 252.33 46.9665C250.929 44.365 250.228 41.3634 250.228 37.9615C250.228 34.5196 250.929 31.4979 252.33 28.8965C253.73 26.295 255.691 24.2939 258.213 22.8932C260.734 21.4924 263.636 20.792 266.918 20.792C270.079 20.792 272.901 21.4724 275.382 22.8331C277.904 24.1939 279.845 26.1349 281.206 28.6563C282.606 31.1377 283.307 33.9993 283.307 37.2411ZM274.602 34.8398C274.562 32.6786 273.781 30.9576 272.261 29.6769C270.74 28.3562 268.879 27.6958 266.678 27.6958C264.596 27.6958 262.835 28.3362 261.395 29.6169C259.994 30.8576 259.133 32.5985 258.813 34.8398H274.602Z"
            fill="#0F172A"></path>
          <path
            d="M295.145 26.4951C296.225 24.7342 297.626 23.3534 299.347 22.3529C301.108 21.3523 303.109 20.852 305.35 20.852V29.6769H303.129C300.487 29.6769 298.486 30.2972 297.126 31.5379C295.805 32.7786 295.145 34.9398 295.145 38.0215V54.5907H286.74V21.3323H295.145V26.4951Z"
            fill="#0F172A"></path>
          <path
            d="M317.095 28.2361V44.325C317.095 45.4456 317.355 46.2661 317.875 46.7864C318.436 47.2666 319.356 47.5068 320.637 47.5068H324.539V54.5907H319.256C312.172 54.5907 308.63 51.1488 308.63 44.265V28.2361V21.3323V13.1077H317.095V21.3323H324.539V28.2361H317.095Z"
            fill="#0F172A"></path>
          <path
            d="M336.287 26.4951C337.368 24.7342 338.769 23.3534 340.49 22.3529C342.251 21.3523 344.252 20.852 346.493 20.852V29.6769H344.272C341.63 29.6769 339.629 30.2972 338.268 31.5379C336.948 32.7786 336.287 34.9398 336.287 38.0215V54.5907H327.883V21.3323H336.287V26.4951Z"
            fill="#0F172A"></path>
          <path
            d="M380.37 37.2411C380.37 38.4417 380.29 39.5223 380.129 40.4829H355.816C356.016 42.8842 356.857 44.7652 358.337 46.126C359.818 47.4868 361.639 48.1671 363.8 48.1671C366.922 48.1671 369.143 46.8264 370.464 44.1449H379.529C378.569 47.3467 376.728 49.9881 374.006 52.0693C371.285 54.1104 367.943 55.131 363.98 55.131C360.779 55.131 357.897 54.4306 355.336 53.0298C352.814 51.589 350.833 49.5679 349.392 46.9665C347.992 44.365 347.291 41.3634 347.291 37.9615C347.291 34.5196 347.992 31.4979 349.392 28.8965C350.793 26.295 352.754 24.2939 355.276 22.8932C357.797 21.4924 360.699 20.792 363.98 20.792C367.142 20.792 369.964 21.4724 372.445 22.8331C374.967 24.1939 376.908 26.1349 378.268 28.6563C379.669 31.1377 380.37 33.9993 380.37 37.2411ZM371.665 34.8398C371.625 32.6786 370.844 30.9576 369.323 29.6769C367.803 28.3562 365.942 27.6958 363.74 27.6958C361.659 27.6958 359.898 28.3362 358.457 29.6169C357.057 30.8576 356.196 32.5985 355.876 34.8398H371.665Z"
            fill="#0F172A"></path>
          <path
            d="M414.72 37.2411C414.72 38.4417 414.64 39.5223 414.48 40.4829H390.166C390.366 42.8842 391.207 44.7652 392.688 46.126C394.168 47.4868 395.989 48.1671 398.151 48.1671C401.272 48.1671 403.494 46.8264 404.814 44.1449H413.879C412.919 47.3467 411.078 49.9881 408.356 52.0693C405.635 54.1104 402.293 55.131 398.331 55.131C395.129 55.131 392.247 54.4306 389.686 53.0298C387.165 51.589 385.183 49.5679 383.743 46.9665C382.342 44.365 381.641 41.3634 381.641 37.9615C381.641 34.5196 382.342 31.4979 383.743 28.8965C385.143 26.295 387.105 24.2939 389.626 22.8932C392.147 21.4924 395.049 20.792 398.331 20.792C401.492 20.792 404.314 21.4724 406.795 22.8331C409.317 24.1939 411.258 26.1349 412.619 28.6563C414.019 31.1377 414.72 33.9993 414.72 37.2411ZM406.015 34.8398C405.975 32.6786 405.195 30.9576 403.674 29.6769C402.153 28.3562 400.292 27.6958 398.091 27.6958C396.009 27.6958 394.248 28.3362 392.808 29.6169C391.407 30.8576 390.546 32.5985 390.226 34.8398H406.015Z"
            fill="#0F172A"></path>
        </svg>
        <br />
        <div style={{ marginTop: 12, textAlign: 'center', fontSize: '18px', fontWeight: '600', color: '#111', textShadow: '0 0 1px #ffffffff' }}>
          Unleash your bidding potential
          <br />
          <div style={{ marginTop: 10, fontSize: '16px', fontWeight: '400' }}></div>
        </div>
      </div>
      <Leva collapsed hidden />
    </Suspense>
  </>
)
