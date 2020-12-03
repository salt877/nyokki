// export default function({ $axios }) {
//   $axios.onRequest((config) => {
//     const idToken = localStorage.getItem('idToken');
//     if(idToken) {
//         // ローカルストレージにトークンがあったら、リクエストヘッダ（Authorization）に付与
//         config.headers.common['Authorization'] = "Bearer " + idToken;
//     }
//   })
// }