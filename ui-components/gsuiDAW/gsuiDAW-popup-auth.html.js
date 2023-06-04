"use strict";

GSUI.setTemplate( "gsui-daw-popup-auth", () => (
	GSUI.createElement( "div", { id: "authPopupContent", class: "gsuiDAW-popup-auth" },
		GSUI.createElement( "fieldset", null,
			GSUI.createElement( "legend", null, "Вход" ),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" },
					GSUI.createElement( "span", null, "Имя пользователя" ),
					GSUI.createElement( "br" ),
					GSUI.createElement( "small", null, "(или email)" ),
				),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", required: true, name: "email", type: "text" } ),
				),
			),
			GSUI.createElement( "div", { class: "gsuiPopup-row" },
				GSUI.createElement( "div", { class: "gsuiPopup-row-title" }, "Пароль" ),
				GSUI.createElement( "div", { class: "gsuiPopup-row-values" },
					GSUI.createElement( "input", { class: "gsuiPopup-inputText", required: true, name: "password", type: "password" } ),
				),
			),
			GSUI.createElement( "div", { class: "gsuiDAW-popup-auth-error" } ),
		),
	)
) );
