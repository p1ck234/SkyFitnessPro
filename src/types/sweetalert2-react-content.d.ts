// @types/sweetalert2-react-content.d.ts
declare module "sweetalert2-react-content" {
  import { SweetAlert2, SweetAlertOptions } from "sweetalert2";
  import { ReactElement } from "react";

  export default function withReactContent(swal: SweetAlert2): {
    fire(options: SweetAlertOptions & { html: ReactElement }): Promise<any>;
    fire(title: ReactElement): Promise<any>;
  };
}
