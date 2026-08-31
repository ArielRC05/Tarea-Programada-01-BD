USE TareaEmpleados;
GO

CREATE PROCEDURE dbo.ListarAlfabetico
As
BEGIN
	SELECT [id],[Nombre],[Salario]
	FROM dbo.Empleado
	ORDER BY Nombre ASC;
END;
GO

--Prueba:
EXEC dbo.ListarAlfabetico