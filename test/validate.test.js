const validate = require('../src/js/validate');

test('debería retornar true para "text" y "abc"', () => expect(validate({ type: 'text', value: 'abc' })).toBe(true));

test('debería retornar false para "text" y "ab"', () => expect(validate({ type: 'text', value: 'ab' })).toBe(false));

test('debería retornar true para "text" y "abñ"', () => expect(validate({ type: 'text', value: 'abñ' })).toBe(true));

test('debería retornar false para "text" y "añ"', () => expect(validate({ type: 'text', value: 'añ' })).toBe(false));

test('debería retornar true para "text" y "abÑ"', () => expect(validate({ type: 'text', value: 'abÑ' })).toBe(true));

test('debería retornar false para "text" y "aÑ"', () => expect(validate({ type: 'text', value: 'aÑ' })).toBe(false));

test('debería retornar true para "text" y "miluska"', () => expect(validate({ type: 'text', value: 'miluska' })).toBe(true));

test('debería retornar false para "text" y " miluska"', () => expect(validate({ type: 'text', value: ' miluska' })).toBe(false));

test('debería retornar true para "text" y "MAYUSCULAS"', () => expect(validate({ type: 'text', value: 'MAYUSCULAS' })).toBe(true));

test('debería retornar false para "text" y "123"', () => expect(validate({ type: 'text', value: '123' })).toBe(false));

test('debería retornar true para "text" y "letras"', () => expect(validate({ type: 'text', value: 'letras' })).toBe(true));

test('debería retornar false para "text" y "num3r0s"', () => expect(validate({ type: 'text', value: 'num3r0s' })).toBe(false));

test('debería retornar true para "text" y "MilusKa Gonzalez"', () => expect(validate({ type: 'text', value: 'Miluska Gonzalez' })).toBe(true));

test('debería retornar false para "text" y "Nombre Muy Extenso"', () => expect(validate({ type: 'text', value: 'Nombre Muy Extenso' })).toBe(false));

test('debería retornar true para "email" y "texto@correo.com"', () => expect(validate({ type: 'email', value: 'texto@correo.com' })).toBe(true));

test('debería retornar false para "email" y "notengoarrobacorreo.com"', () => expect(validate({ type: 'email', value: 'notengoarrobacorreo.com' })).toBe(false));

test('debería retornar true para "email" y "top-level@domain.com"', () => expect(validate({ type: 'email', value: 'top-level@domain.com' })).toBe(true));

test('debería retornar false para "email" y "sindominio@"', () => expect(validate({ type: 'email', value: 'sindominio@' })).toBe(false));

test('debería retornar true para "email" y "second-level@domain.com.pe"', () => expect(validate({ type: 'email', value: 'second-level@domain.com.pe' })).toBe(true));

test('debería retornar false para "email" y "second-level@domaintypo.compe"', () => expect(validate({ type: 'email', value: 'second-level@domaintypo.compe' })).toBe(false));

test('debería retornar true para "email" y "tengo.unpunto@correo.com"', () => expect(validate({ type: 'email', value: 'tengo.unpunto@correo.com' })).toBe(true));

test('debería retornar false para "email" y "tengo..masdeunpunto@correo.com"', () => expect(validate({ type: 'email', value: 'tengo..masdeunpunto@correo.com' })).toBe(false));

test('debería retornar true para "email" y "tengo-unguion@correo.com"', () => expect(validate({ type: 'email', value: 'tengo-unguion@correo.com' })).toBe(true));

test('debería retornar false para "email" y "tengo--masdeunguion@correo.com"', () => expect(validate({ type: 'email', value: 'tengo--masdeunguion@correo.com' })).toBe(false));

test('debería retornar true para "email" y "tengo_unguionbajo@correo.com"', () => expect(validate({ type: 'email', value: 'tengo_unguionbajo@correo.com' })).toBe(true));

test('debería retornar false para "email" y "tengo__masdeunguionbajo@correo.com"', () => expect(validate({ type: 'email', value: 'tengo__masdeunguionbajo@correo.com' })).toBe(false));

test('debería retornar true para "email" y "tengo.puntoy-guion@correo.com"', () => expect(validate({ type: 'email', value: 'tengo.puntoy-guion@correo.com' })).toBe(true));

test('debería retornar false para "email" y "tengo.-puntoyguionjuntos@correo.com"', () => expect(validate({ type: 'email', value: 'tengo.-puntoyguionjuntos@correo.com' })).toBe(false));

test('debería retornar true para "password" y "abcdef"', () => expect(validate({ type: 'password', value: 'abcdef' })).toBe(true));

test('debería retornar false para "password" y "abcde"', () => expect(validate({ type: 'password', value: 'abcde' })).toBe(false));

test('debería retornar true para "password" y "ABCDEF"', () => expect(validate({ type: 'password', value: 'ABCDEF' })).toBe(true));

test('debería retornar true para "password" y "ABCDE"', () => expect(validate({ type: 'password', value: 'ABCDE' })).toBe(false));

test('debería retornar true para "password" y "123456"', () => expect(validate({ type: 'password', value: '123456' })).toBe(true));

test('debería retornar true para "password" y "12345"', () => expect(validate({ type: 'password', value: '12345' })).toBe(false));

test('debería retornar true para "password" y "abCD12"', () => expect(validate({ type: 'password', value: 'abCD12' })).toBe(true));

test('debería retornar true para "password" y "aB1"', () => expect(validate({ type: 'password', value: 'aB1' })).toBe(false));
