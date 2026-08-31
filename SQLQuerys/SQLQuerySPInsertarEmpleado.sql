USE TareaEmpleados
GO

CREATE PROCEDURE dbo.InsertarEmpleado
	@Nombre VARCHAR(128), --los datos que recibe varchar 128 caracteres
	@Salario DECIMAL(10,2) --decimal (10 digitos, 2 despues del . decimal)
AS
BEGIN
	IF EXISTS (
		SELECT 1
		FROM dbo.Empleado
		WHERE Nombre = @Nombre
	)
	BEGIN
		SELECT 1 AS NumResultado, --1 significa ya existe
			'Nombre de Empleado ya existe.' AS Mensaje;
		RETURN;
	END;
		
	INSERT INTO dbo.Empleado (Nombre, Salario) --insert into: insertar en tabla empleado en columnas nombre y salario
	VALUES (@Nombre, @Salario);

	SELECT 0 AS NumResultado,
		'Inserción exitosa' AS Mensaje;
END;
GO