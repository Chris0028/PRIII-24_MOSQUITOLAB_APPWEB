--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: bdd_laboratorio_mosquito_user
--

-- *not* creating schema, since initdb creates it

--
-- TOC entry 289 (class 1255 OID 17048)
-- Name: ufc_create_file(character varying, character varying, character varying, character, character varying, date, character varying, character varying, date, date, character varying, character varying, character varying, character varying, integer, character varying, character varying, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying, date, smallint, character varying, date, smallint, character varying, character varying, date, character varying, date, character varying, character varying, character varying, character varying, integer, character varying, date, text, character varying, character varying, character varying, integer, integer, integer[], character varying[]); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_create_file(p_patient_name character varying, p_patient_lastname character varying, p_patient_secondlastname character varying, p_patient_gender character, p_patient_ci character varying, p_patient_birthdate date, p_patient_phone character varying, p_patient_code character varying, p_pregnant_lastmenstruationdate date, p_pregnant_childbirthdate date, p_pregnant_disease character varying, p_child_parent character varying, p_ip_typeinsured character varying, p_ip_insuredrecord character varying, p_insurance_id integer, p_direction_city character varying, p_direction_neighborhood character varying, p_direction_latitude character varying, p_direction_longitude character varying, p_direction_municipality_id integer, p_contagion_neighborhood character varying, p_contagion_city character varying, p_contagion_municipality character varying, p_contagion_state character varying, p_contagion_country character varying, p_hospitalized_entrydate date, p_hospitalized_type smallint, p_hospitalized_name character varying, p_u_entrydate date, p_u_type smallint, p_u_name character varying, p_dh_dischargetype character varying, p_dh_dischargedate date, p_file_code character varying, p_file_symptomsdate date, p_file_discoverymethod character varying, p_file_epideweek character varying, p_case_casetype character varying, p_case_method character varying, p_case_disease_id integer, p_sample_sampletype character varying, p_sample_collectiondate date, p_sample_observation text, p_test_diagnosticmethod character varying, p_test_result character varying, p_test_observation character varying, p_test_laboratory_id integer, p_user_id integer, p_symptoms integer[], p_is_symptoms_present character varying[]) RETURNS integer
    LANGUAGE plpgsql
    AS $$

DECLARE

    total_inserts INTEGER := 0;
    p_patient_Id BIGINT := 0;
    p_hospitalized_Id BIGINT := 0;
    p_file_Id BIGINT := 0;
    p_sample_Id INTEGER := 0;
	
BEGIN

	-- Insert "patient"
	INSERT INTO public.patient (name, "lastName", "secondLastName", gender, ci, 
								"birthDate", phone, code, "userId") 
	VALUES (p_patient_name, p_patient_lastName, p_patient_SecondLastName, p_patient_gender,
			p_patient_ci, p_patient_birthDate, p_patient_phone, p_patient_code, p_user_Id)
	RETURNING id INTO p_patient_Id;

	total_inserts := total_inserts + 1;

	-- Insert "direction"
	INSERT INTO public.direction (city, neighborhood, latitude, longitude, "municipalityId", "patientId") 
	VALUES (p_direction_city, p_direction_neighborhood, p_direction_latitude, p_direction_longitude, p_direction_municipality_Id, p_patient_Id);
	
	total_inserts := total_inserts + 1;

	IF(p_insurance_Id IS NOT NULL) THEN

		-- Insert "insurancePatient"
		INSERT INTO public."insurancePatient" ("typeInsured", "insuredRecord", "patientId", "insuranceId") 
		VALUES (p_ip_typeInsured, p_ip_insuredRecord, p_patient_Id, p_insurance_Id);
	
		total_inserts := total_inserts + 1;
		
	END IF;

	IF(p_pregnant_lastMenstruationDate IS NOT NULL) THEN
	
		-- Insert "pregnant"
		INSERT INTO public.pregnant ("lastMenstruationDate", "childBirthDate", disease, "patientId") 
		VALUES (p_pregnant_lastMenstruationDate, p_pregnant_childBirthDate, p_pregnant_disease, p_patient_Id);
	
		total_inserts := total_inserts + 1;
		
	END IF;

	IF(p_child_parent IS NOT NULL) THEN
	
		-- Insert "child"
		INSERT INTO public.child (parent, "patientId") 
		VALUES (p_child_parent, p_patient_Id);

		total_inserts := total_inserts + 1;
		
	END IF;

	-- Insert "contagion"
	INSERT INTO public.contagion (neighborhood, city, municipality, state, country, "patientId") 
	VALUES (p_contagion_neighborhood, p_contagion_city, p_contagion_municipality, p_contagion_state, p_contagion_country, p_patient_Id);
	
	total_inserts := total_inserts + 1;

	IF (p_hospitalized_type = 1) THEN
	
		-- Insert "hospitalized"
		INSERT INTO public.hospitalized ("entryDate", type, "hospitalName", "patientId") 
		VALUES (p_hospitalized_entryDate, p_hospitalized_type, p_hospitalized_name, p_patient_Id)
        RETURNING id INTO p_hospitalized_Id;

        total_inserts := total_inserts + 1;

    END IF;

    IF (p_U_name IS NOT NULL OR TRIM(p_U_name) <> '') THEN
	
        -- Insert "hospitalized" UTI
        INSERT INTO public.hospitalized ("entryDate", type, "hospitalName", "patientId") 
		VALUES (p_U_entryDate, 2, p_U_name, p_patient_Id)
        RETURNING id INTO p_hospitalized_Id;

        total_inserts := total_inserts + 1;
		
    END IF;

    IF (p_dh_dischargeType IS NOT NULL) THEN
		
		-- Insert "dischargehospitalized"
		INSERT INTO public.dischargehospitalized ("dischargeType", "dischargeDate", "hospitalizedId") 
		VALUES (p_dh_dischargeType, p_dh_dischargeDate, p_hospitalized_Id);

		total_inserts := total_inserts + 1;
			
	END IF;

	-- Insert "file"
	INSERT INTO public.file (code, "symptomsDate", "discoveryMethod", "epidemiologicalWeek", "userId", "patientId") 
	VALUES (p_file_code, p_file_symptomsDate, p_file_discoveryMethod, p_file_epideWeek, p_user_Id, p_patient_Id)
	RETURNING id INTO p_file_Id;
	
	total_inserts := total_inserts + 1;

	-- Insert "case"
	INSERT INTO public."case" ("caseType", method, "diseaseId", "fileId") 
	VALUES (p_case_caseType, p_case_method, p_case_disease_Id, p_file_Id);

	total_inserts := total_inserts + 1;

    -- Recorrer p_symptoms y p_is_symptoms_present
    FOR i IN 1..array_length(p_symptoms, 1) LOOP
	
		-- Insert "diseasesymptomfile"
		INSERT INTO public.diseasesymptomfile ("symptomPresent", "diseaseId", "symptomId", "fileId") 
		VALUES (p_is_symptoms_present[i], p_case_disease_Id, p_symptoms[i], p_file_Id);

		
        total_inserts := total_inserts + 1;
		
    END LOOP;
	
	-- Insert "sample"
	INSERT INTO public.sample ("sampleType", "sampleCollectionDate", observation, "fileId") 
	VALUES (p_sample_sampleType, p_sample_CollectionDate, p_sample_observation, p_file_Id)
	RETURNING id INTO p_sample_Id;
	
	total_inserts := total_inserts + 1;

	-- Inserción en la tabla "test"
	INSERT INTO public.test ("diagnosticMethod", result, observation, "userId", "sampleId", "diseaseId", "laboratoryId") 
	VALUES (p_test_diagnosticMethod, p_test_result, p_test_observation, p_user_Id, p_sample_Id, p_case_disease_Id, p_test_laboratory_Id);
	
	total_inserts := total_inserts + 1;
	
    RETURN total_inserts;
END;
$$;


-- TOC entry 284 (class 1255 OID 16926)
-- Name: ufc_get_all_users(); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_get_all_users() RETURNS TABLE(userid integer, username character varying, role character varying, status smallint, fullname text, phone character varying, email character varying, workplace character varying)
    LANGUAGE plpgsql
    AS $$
	BEGIN
RETURN QUERY
SELECT U."id", U."username", U."role", U."status", CONCAT(E."names", ' ', E."lastName", ' ', COALESCE("secondLastName", '')), E."phone", E."email", L."name" AS workPlace
	FROM "user" U
	JOIN employee E ON E."userId" = U."id"
	JOIN laboratory L ON L."id" = E."laboratoryId"
	UNION
SELECT U."id", U."username", U."role", U."status", CONCAT(D."name", ' ', D."lastName", ' ', COALESCE("secondLastName", '')), D."phone", D."email", H."name" AS workPlace
	FROM "user" U
	JOIN doctor D ON D."userId" = U."id"
	JOIN hospital H ON H."id" = D."hospitalId";
END;
$$;


--
-- TOC entry 286 (class 1255 OID 17016)
-- Name: ufc_get_file(bigint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_get_file(p_file_id bigint) RETURNS TABLE(file_id bigint, file_code character varying, symptoms_date date, discovery_method character varying, epidemiological_week character varying, file_register_date timestamp without time zone, file_last_update timestamp without time zone, file_status smallint, file_user_id integer, file_last_update_user_id integer, patient_id bigint, patient_name character varying, patient_last_name character varying, patient_second_last_name character varying, patient_gender character, patient_ci character varying, patient_birth_date date, patient_phone character varying, patient_code character varying, patient_register_date timestamp without time zone, patient_last_update timestamp without time zone, patient_last_update_user_id integer, pregnant_id integer, last_menstruation_date date, child_birth_date date, pregnant_disease character varying, child_id integer, child_parent character varying, insurance_id integer, type_insured character varying, insured_record character varying, direction_id integer, direction_city character varying, direction_neighborhood character varying, direction_latitude character varying, direction_longitude character varying, direction_municipality_id integer, contagion_id integer, contagion_neighborhood character varying, contagion_city character varying, contagion_municipality character varying, contagion_state character varying, contagion_country character varying, hospitalized_id bigint, entry_date date, hospitalized_type smallint, hospitalized_hospital_name character varying, discharge_id integer, discharge_type character varying, discharge_date date, case_id integer, case_type character varying, case_method character varying, case_disease_id integer, disease_symptom_id integer, symptom_present character varying, sample_id bigint, sample_type character varying, sample_collection_date date, sample_observation text, sample_status character varying, test_id integer, diagnostic_method character varying, test_result character varying, test_observation text, hospital_name character varying, hospital_typehospital smallint, hospital_contact character varying, hospital_network character varying, municipality_name character varying, state_name character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.id, f.code, f."symptomsDate", f."discoveryMethod", f."epidemiologicalWeek", f."registerDate", 
        f."lastUpdate", f.status, f."userId", f."lastUpdateUserId", 
        p.id, p.name, p."lastName", p."secondLastName", p.gender, p.ci, 
        p."birthDate", p.phone, p.code, p."registerDate", p."lastUpdate", p."lastUpdateUserId",
        preg.id, preg."lastMenstruationDate", preg."childBirthDate", preg.disease,
        c.id, c.parent,
        ip.id, ip."typeInsured", ip."insuredRecord",
        d.id, d.city, d.neighborhood, d.latitude, d.longitude, d."municipalityId",
        cont.id, cont.neighborhood, cont.city, cont.municipality, cont.state, cont.country,
        h.id, h."entryDate", h.type, h."hospitalName",
        dh.id, dh."dischargeType", dh."dischargeDate",
        ca.id, ca."caseType", ca.method, ca."diseaseId",
        dsf.id, dsf."symptomPresent",
        s.id, s."sampleType", s."sampleCollectionDate", s.observation, s.status,
        t.id, t."diagnosticMethod", t.result, t.observation,
        hos."name", hos."typeHospital", hos."contact", hos."network", mun."name", st."name"
    FROM 
        file f
    LEFT JOIN patient p ON f."patientId" = p.id
    LEFT JOIN LATERAL (
        SELECT * FROM pregnant preg 
        WHERE preg."patientId" = p.id 
        ORDER BY preg."lastMenstruationDate" DESC LIMIT 1
    ) preg ON true
    LEFT JOIN LATERAL (
        SELECT * FROM child c 
        WHERE c."patientId" = p.id 
        ORDER BY c.id LIMIT 1
    ) c ON true
    LEFT JOIN LATERAL (
        SELECT * FROM "insurancePatient" ip 
        WHERE ip."patientId" = p.id 
        ORDER BY ip.id LIMIT 1
    ) ip ON true
    LEFT JOIN LATERAL (
        SELECT * FROM direction d 
        WHERE d."patientId" = p.id 
        ORDER BY d.id LIMIT 1
    ) d ON true
    LEFT JOIN LATERAL (
        SELECT * FROM contagion cont 
        WHERE cont."patientId" = p.id 
        ORDER BY cont.id LIMIT 1
    ) cont ON true
    LEFT JOIN LATERAL (
        SELECT * FROM hospitalized h 
        WHERE h."patientId" = p.id 
        ORDER BY h."entryDate" DESC LIMIT 1
    ) h ON true
    LEFT JOIN dischargehospitalized dh ON h.id = dh."hospitalizedId"
    LEFT JOIN LATERAL (
        SELECT * FROM "case" ca 
        WHERE ca."fileId" = f.id 
        ORDER BY ca.id LIMIT 1
    ) ca ON true
    LEFT JOIN LATERAL (
        SELECT * FROM diseasesymptomfile dsf 
        WHERE dsf."fileId" = f.id 
        ORDER BY dsf.id LIMIT 1
    ) dsf ON true
    LEFT JOIN LATERAL (
        SELECT * FROM sample s 
        WHERE s."fileId" = f.id 
        ORDER BY s."sampleCollectionDate" DESC LIMIT 1
    ) s ON true
    LEFT JOIN LATERAL (
        SELECT * FROM test t 
        WHERE t."sampleId" = s.id 
        ORDER BY t."registerDate" DESC LIMIT 1
    ) t ON true
    LEFT JOIN "user" u ON u.id = f."userId"
    LEFT JOIN doctor doc ON doc."userId" = u.id
    LEFT JOIN hospital hos ON hos.id = doc."hospitalId"
    LEFT JOIN municipality mun ON mun.id = hos."municipalityId"
    LEFT JOIN state st ON st.id = mun."stateId"
    WHERE 
        f.id = p_file_id;
END;
$$;


--
-- TOC entry 288 (class 1255 OID 17044)
-- Name: ufc_get_file_with_result(bigint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_get_file_with_result(p_file_id bigint) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
DECLARE 
	get_role_by_fileId VARCHAR := '';
file_data jsonb;
BEGIN
	SELECT u."role"
	INTO get_role_by_fileId
	FROM "file" f 
	INNER JOIN "user" u ON u.id = f."userId"
	WHERE f.id = p_file_id;

	IF (get_role_by_fileId = 'Doctor') THEN
		RETURN (
        SELECT jsonb_build_object(
			'fileCode', f."code",
            'symptomsDate', f."symptomsDate",
            'discoveryMethod', f."discoveryMethod",
            'epidemiologicalWeek', f."epidemiologicalWeek",
            'registerDate', f."registerDate",
            'patient', jsonb_build_object(
                'name', p.name,
                'lastName', p."lastName",
                'secondLastName', p."secondLastName",
                'gender', p.gender,
                'ci', p.ci,
                'birthDate', p."birthDate",
                'phone', p.phone
            ),
            'child', jsonb_build_object(
                'parent', c.parent
            ),
            'location', jsonb_build_object(
                'state', st."name",
                'municipality', mun."name",
                'city', d.city,
                'neighborhood', d.neighborhood,
                'latitude', d.latitude,
                'longitude', d.longitude
            ),
            'pregnant', jsonb_build_object(
                'lastMenstruationDate', preg."lastMenstruationDate",
                'childBirthDate', preg."childBirthDate",
                'disease', preg.disease
            ),
            'contagion', jsonb_build_object(
                'country', cont.country,
                'state', cont.state,
                'municipality', cont.municipality,
                'city', cont.city,
                'neighborhood', cont.neighborhood
            ),
            'symptoms', (
                SELECT json_agg(
                    jsonb_build_object(
                        'symptom', s."symptomName",
                        'present', dsf."symptomPresent",
                        'disease', dsf."diseaseId"
                    )
                )
                FROM diseasesymptomfile dsf
				INNER JOIN "symptom" s ON s.id = dsf."symptomId"
                WHERE dsf."fileId" = f.id
            ),
            'hospitalization', (
                SELECT json_agg(
                    jsonb_build_object(
                        'entryDate', h."entryDate",
                        'type', h.type,
                        'hospitalName', h."hospitalName"
                    )
                )
                FROM hospitalized h
                WHERE h."patientId" = p.id
            ),
            'discharge', (
                SELECT jsonb_build_object(
                    'dischargeType', dh."dischargeType",
                    'dischargeDate', dh."dischargeDate"
                )
                FROM dischargehospitalized dh
                WHERE dh."hospitalizedId" = (
                    SELECT id FROM hospitalized WHERE "patientId" = p.id LIMIT 1
                )
            ),
            'case', jsonb_build_object(
                'caseType', ca."caseType",
                'method', ca.method
            ),
            'samples', (
                SELECT json_agg(
                    jsonb_build_object(
                        'sampleType', s."sampleType",
                        'sampleCollectionDate', s."sampleCollectionDate"
                    )
                )
                FROM sample s
                WHERE s."fileId" = f.id
            ),
            'tests', (
                SELECT json_agg(
                    jsonb_build_object(
                        'diagnosticMethod', t."diagnosticMethod",
                        'result', t.result,
                        'observation', t.observation
                    )
                )
                FROM test t
                JOIN sample s ON s.id = t."sampleId"
                WHERE s."fileId" = f.id
            ),
			'notifier', (
				SELECT json_build_object(
						'username', u."username",
						'role', u."role",
						'userId', u.id,
						'name', CONCAT(D."name", ' ',D."lastName",' ',COALESCE(D."secondLastName",'')),
						'phone', D."phone",
						'email', D."email",
						'hospital', H."name",
						'contact', H."contact",
						'hospitalNetwork', H."network",
						'state', st."name",
						'municipality', mun."name"
					)
				FROM "user" u 
				INNER JOIN "file" f ON f."userId" = u.id
				INNER JOIN "doctor" D ON D."userId" = u.id
				INNER JOIN "hospital" H ON H.id = D."hospitalId"
				INNER JOIN "municipality" mun ON mun.id = H."municipalityId"
		        INNER JOIN "state" st ON st.id = mun."stateId"
				WHERE f.id = p_file_id
			)
        )
        FROM 
            file f
        LEFT JOIN patient p ON f."patientId" = p.id
        LEFT JOIN pregnant preg ON p.id = preg."patientId"
        LEFT JOIN child c ON p.id = c."patientId"
        LEFT JOIN direction d ON p.id = d."patientId"
        LEFT JOIN contagion cont ON p.id = cont."patientId"
        LEFT JOIN "case" ca ON f.id = ca."fileId"
        LEFT JOIN "user" u ON u.id = f."userId"
        LEFT JOIN doctor doc ON doc."userId" = u.id
        LEFT JOIN hospital hos ON hos.id = doc."hospitalId"
        LEFT JOIN "municipality" mun ON mun.id = hos."municipalityId"
        LEFT JOIN "state" st ON st.id = mun."stateId"
        WHERE 
            f.id = p_file_id
    );
	ELSE
		RETURN (
        SELECT jsonb_build_object(
			'fileCode', f."code",
            'symptomsDate', f."symptomsDate",
            'discoveryMethod', f."discoveryMethod",
            'epidemiologicalWeek', f."epidemiologicalWeek",
            'registerDate', f."registerDate",
            'patient', jsonb_build_object(
                'name', p.name,
                'lastName', p."lastName",
                'secondLastName', p."secondLastName",
                'gender', p.gender,
                'ci', p.ci,
                'birthDate', p."birthDate",
                'phone', p.phone
            ),
            'child', jsonb_build_object(
                'parent', c.parent
            ),
            'location', jsonb_build_object(
                'state', st."name",
                'municipality', mun."name",
                'city', d.city,
                'neighborhood', d.neighborhood,
                'latitude', d.latitude,
                'longitude', d.longitude
            ),
            'pregnant', jsonb_build_object(
                'lastMenstruationDate', preg."lastMenstruationDate",
                'childBirthDate', preg."childBirthDate",
                'disease', preg.disease
            ),
            'contagion', jsonb_build_object(
                'country', cont.country,
                'state', cont.state,
                'municipality', cont.municipality,
                'city', cont.city,
                'neighborhood', cont.neighborhood
            ),
            'symptoms', (
                SELECT json_agg(
                    jsonb_build_object(
                        'symptom', s."symptomName",
                        'present', dsf."symptomPresent",
                        'disease', dsf."diseaseId"
                    )
                )
                FROM diseasesymptomfile dsf
				INNER JOIN "symptom" s ON s.id = dsf."symptomId"
                WHERE dsf."fileId" = f.id
            ),
            'hospitalization', (
                SELECT json_agg(
                    jsonb_build_object(
                        'entryDate', h."entryDate",
                        'type', h.type,
                        'hospitalName', h."hospitalName"
                    )
                )
                FROM hospitalized h
                WHERE h."patientId" = p.id
            ),
            'discharge', (
                SELECT jsonb_build_object(
                    'dischargeType', dh."dischargeType",
                    'dischargeDate', dh."dischargeDate"
                )
                FROM dischargehospitalized dh
                WHERE dh."hospitalizedId" = (
                    SELECT id FROM hospitalized WHERE "patientId" = p.id LIMIT 1
                )
            ),
            'case', jsonb_build_object(
                'caseType', ca."caseType",
                'method', ca.method
            ),
            'samples', (
                SELECT json_agg(
                    jsonb_build_object(
                        'sampleType', s."sampleType",
                        'sampleCollectionDate', s."sampleCollectionDate"
                    )
                )
                FROM sample s
                WHERE s."fileId" = f.id
            ),
            'tests', (
                SELECT json_agg(
                    jsonb_build_object(
                        'diagnosticMethod', t."diagnosticMethod",
                        'result', t.result,
                        'observation', t.observation
                    )
                )
                FROM test t
                JOIN sample s ON s.id = t."sampleId"
                WHERE s."fileId" = f.id
            ),
			'notifier', (
				SELECT json_build_object(
						'username', u."username",
						'role', u."role",
						'userId', u.id,
						'name', CONCAT(E."names", ' ',E."lastName",' ',COALESCE(E."secondLastName",'')),
						'phone', E."phone",
						'email', E."email",
						'labo', L."name",
						'laboNetwork', L."network",
						'state', st."name",
						'municipality', mun."name"
					)
				FROM "user" u 
				INNER JOIN "file" f ON f."userId" = u.id
				INNER JOIN "employee" E ON E."userId" = u.id
				INNER JOIN laboratory L ON L.id = E."laboratoryId"
				INNER JOIN "municipality" mun ON mun.id = L."municipalityId"
		        INNER JOIN "state" st ON st.id = mun."stateId"
				WHERE f.id = p_file_id
			)
        )
        FROM 
            file f
        LEFT JOIN patient p ON f."patientId" = p.id
        LEFT JOIN pregnant preg ON p.id = preg."patientId"
        LEFT JOIN child c ON p.id = c."patientId"
        LEFT JOIN direction d ON p.id = d."patientId"
        LEFT JOIN contagion cont ON p.id = cont."patientId"
        LEFT JOIN "case" ca ON f.id = ca."fileId"
        LEFT JOIN "user" u ON u.id = f."userId"
        LEFT JOIN doctor doc ON doc."userId" = u.id
        LEFT JOIN hospital hos ON hos.id = doc."hospitalId"
        LEFT JOIN "municipality" mun ON mun.id = hos."municipalityId"
        LEFT JOIN "state" st ON st.id = mun."stateId"
        WHERE 
            f.id = p_file_id
    );
	END IF;
	
    
END;
$$;


--
-- TOC entry 287 (class 1255 OID 17026)
-- Name: ufc_get_result_details(bigint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_get_result_details(file_id bigint) RETURNS TABLE(lab_name text, result_register_date timestamp without time zone, patient_name text, patient_age integer, file_code text, sample_type text, sample_collection_date date, symptoms_start_date date, diagnostic_methods text, hospital_name text, result_person text, result_details text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT DISTINCT
        l.name::TEXT AS lab_name,
        t."registerDate" AS result_register_date,
        (p.name || ' ' || p."lastName" || ' ' || COALESCE(p."secondLastName", ''))::TEXT AS patient_name,
        EXTRACT(YEAR FROM AGE(p."birthDate"))::INTEGER AS patient_age,
        f.code::TEXT AS file_code,
        s."sampleType"::TEXT AS sample_type,
        s."sampleCollectionDate" AS sample_collection_date,
        f."symptomsDate" AS symptoms_start_date,
        STRING_AGG((t."diagnosticMethod")::TEXT, '; ') AS diagnostic_methods,
        h.name::TEXT AS hospital_name,
        (e.names || ' ' || e."lastName" || ' ' || COALESCE(e."secondLastName", ''))::TEXT AS result_person,
        (d.name || ' - ' || t.result)::TEXT AS result_details
    FROM 
        public.file f
    JOIN public.patient p ON f."patientId" = p.id
    LEFT JOIN public.sample s ON s."fileId" = f.id
    LEFT JOIN public.test t ON t."sampleId" = s.id
    LEFT JOIN public.disease d ON d.id = t."diseaseId"
    LEFT JOIN public.laboratory l ON l.id = t."laboratoryId"
    LEFT JOIN public.doctor doc ON doc."userId" = t."userId"
    LEFT JOIN public.hospital h ON h.id = doc."hospitalId"
    LEFT JOIN public."user" u ON u.id = t."lastUpdateUserId"
    LEFT JOIN public.employee e ON e."userId" = u.id
    WHERE 
        f.id = file_id
    GROUP BY 
        l.name, t."registerDate", p.name, p."lastName", p."secondLastName", p."birthDate", 
        f.code, s."sampleType", s."sampleCollectionDate", f."symptomsDate", h.name, e.names, e."lastName", e."secondLastName", d.name, t.result;
END;$$;



--
-- TOC entry 285 (class 1255 OID 16960)
-- Name: ufc_get_test(bigint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_get_test(p_file_id bigint) RETURNS TABLE(sampletype character varying, sampleobservation text, diagnosticmethod character varying, result character varying, testobservation text, casetype character varying, method character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
	SELECT S."sampleType", S."observation", T."diagnosticMethod", T."result", T."observation", C."caseType", C."method" 
	FROM "file" F
	INNER JOIN sample S ON S."fileId" = F."id"
	INNER JOIN test T ON T."sampleId" = S."id"
	INNER JOIN "case" C ON C."fileId" = F."id"
	WHERE F."id" = p_file_id;
END;
$$;



--
-- TOC entry 290 (class 1255 OID 17050)
-- Name: ufc_reports_file(integer, date, date, date, date, date, date, character varying, character varying, character varying, character varying, character varying, character varying, smallint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_reports_file(p_laboratory_id integer DEFAULT NULL::integer, p_symptoms_date_from date DEFAULT NULL::date, p_symptoms_date_to date DEFAULT NULL::date, p_notification_date_from date DEFAULT NULL::date, p_notification_date_to date DEFAULT NULL::date, p_result_date_from date DEFAULT NULL::date, p_result_date_to date DEFAULT NULL::date, p_test_result character varying DEFAULT NULL::character varying, p_diagnostic_method character varying DEFAULT NULL::character varying, p_department character varying DEFAULT NULL::character varying, p_health_network character varying DEFAULT NULL::character varying, p_municipality character varying DEFAULT NULL::character varying, p_establishment character varying DEFAULT NULL::character varying, p_subsector smallint DEFAULT NULL::smallint) RETURNS TABLE(file_id bigint, file_code character varying, test_result character varying, patient_ci character varying, patient_name character varying, patient_last_name character varying, patient_second_last_name character varying, patient_birth_date character varying, sex character, age integer, pregnant character varying, probable_infection_department character varying, probable_infection_municipality character varying, infection_location character varying, current_address character varying, latitude character varying, longitude character varying, phone character varying, notifier_center character varying, laboratory_name character varying, symptoms_start_date character varying, sample_collection_date character varying, report_date character varying, dengue integer, zika integer, chikungunya integer, rt_pcr_dengue integer, elisa_ns1_dengue integer, mac_elisa_igm_dengue integer, rt_pcr_zika integer, elisa_igm_zika integer, rt_pcr_chikungunya integer, elisa_igm_chikungunya integer, mialgia integer, fiebre integer, vomitos integer, cefalea integer, dolor_retro_orbitario integer, dolor_abdominal integer, letargia integer, irritabilidad integer, sangrado_mucosas integer, distres_respiratorio integer, choque integer, sangrado_grave integer, compromiso_organos integer, poliartralgias integer, poliartritis integer, exantema integer, exantema_maculopapular integer, conjuntivitis_no_purulenta integer, artralgia integer, edema_periarticular integer, petequias_prueba_torniquete integer, observations text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.id AS file_id,
        f.code AS file_code,
        t.result::character varying AS test_result,
        p.ci AS patient_ci,
        p.name AS patient_name,
        p."lastName" AS patient_last_name,
        p."secondLastName" AS patient_second_last_name,
        p."birthDate"::character varying AS patient_birth_date,
        p.gender AS sex,
        EXTRACT(YEAR FROM age(p."birthDate"))::integer AS age,
        CASE 
            WHEN p.gender = 'F' AND pr."childBirthDate" IS NOT NULL THEN 'Sí' 
            WHEN p.gender = 'F' AND pr."childBirthDate" IS NULL THEN 'No'
            WHEN p.gender = 'M' THEN NULL
        END::character varying AS pregnant,
        c.state::character varying AS probable_infection_department,
        c.municipality::character varying AS probable_infection_municipality,
        c.neighborhood::character varying AS infection_location,
        dtn.neighborhood::character varying AS current_address,
		dtn.latitude,
		dtn.longitude,
        p.phone::character varying AS phone,
        h.name::character varying AS notifier_center,
        lab.name::character varying AS laboratory_name,
        f."symptomsDate"::character varying AS symptoms_start_date,
        s."sampleCollectionDate"::character varying AS sample_collection_date, 
        f."registerDate"::character varying AS report_date,
        CASE WHEN d.id = 1 THEN 1 ELSE 0 END AS dengue,
        CASE WHEN d.id = 3 THEN 1 ELSE 0 END AS zika,
        CASE WHEN d.id = 2 THEN 1 ELSE 0 END AS chikungunya,
        MAX(t_diag.rt_pcr_dengue) AS rt_pcr_dengue,
        MAX(t_diag.elisa_ns1_dengue) AS elisa_ns1_dengue,
        MAX(t_diag.mac_elisa_igm_dengue) AS mac_elisa_igm_dengue,
        MAX(t_diag.rt_pcr_zika) AS rt_pcr_zika,
        MAX(t_diag.elisa_igm_zika) AS elisa_igm_zika,
        MAX(t_diag.rt_pcr_chikungunya) AS rt_pcr_chikungunya,
        MAX(t_diag.elisa_igm_chikungunya) AS elisa_igm_chikungunya,
        MAX(ds.mialgia) AS mialgia,
        MAX(ds.fiebre) AS fiebre,
        MAX(ds.vomitos) AS vomitos,
        MAX(ds.cefalea) AS cefalea,
        MAX(ds.dolor_retro_orbitario) AS dolor_retro_orbitario,
        MAX(ds.dolor_abdominal) AS dolor_abdominal,
        MAX(ds.letargia) AS letargia,
        MAX(ds.irritabilidad) AS irritabilidad,
        MAX(ds.sangrado_mucosas) AS sangrado_mucosas,
        MAX(ds.distres_respiratorio) AS distres_respiratorio,
        MAX(ds.choque) AS choque,
        MAX(ds.sangrado_grave) AS sangrado_grave,
        MAX(ds.compromiso_organos) AS compromiso_organos,
        MAX(ds.poliartralgias) AS poliartralgias,
        MAX(ds.poliartritis) AS poliartritis,
        MAX(ds.exantema) AS exantema,
        MAX(ds.exantema_maculopapular) AS exantema_maculopapular,
        MAX(ds.conjuntivitis_no_purulenta) AS conjuntivitis_no_purulenta,
        MAX(ds.artralgia) AS artralgia,
        MAX(ds.edema_periarticular) AS edema_periarticular,
        MAX(ds.petequias_prueba_torniquete) AS petequias_prueba_torniquete,
        t.observation
    FROM patient p
    INNER JOIN file f ON p.id = f."patientId"
    LEFT JOIN pregnant pr ON p.id = pr."patientId"
    INNER JOIN sample s ON f.id = s."fileId"
    INNER JOIN test t ON s.id = t."sampleId"
    INNER JOIN disease d ON d.id = t."diseaseId"
    LEFT JOIN direction dtn ON p.id = dtn."patientId"
    LEFT JOIN contagion c ON p.id = c."patientId"
    LEFT JOIN "user" u ON t."userId" = u.id
    LEFT JOIN doctor doc ON u.id = doc."userId"
    LEFT JOIN hospital h ON doc."hospitalId" = h.id 
    LEFT JOIN laboratory lab ON lab.id = t."laboratoryId"
    LEFT JOIN (
        SELECT 
            "fileId",
            MAX(CASE WHEN "diseaseId" = 1 AND "diagnosticMethod" = 'RT-PCR en tiempo real' THEN 1 ELSE 0 END) AS rt_pcr_dengue,
            MAX(CASE WHEN "diseaseId" = 1 AND "diagnosticMethod" = 'Elisa NS1' THEN 1 ELSE 0 END) AS elisa_ns1_dengue,
            MAX(CASE WHEN "diseaseId" = 1 AND "diagnosticMethod" = 'Mac Elisa IgM' THEN 1 ELSE 0 END) AS mac_elisa_igm_dengue,
            MAX(CASE WHEN "diseaseId" = 3 AND "diagnosticMethod" = 'RT-PCR en tiempo real' THEN 1 ELSE 0 END) AS rt_pcr_zika,
            MAX(CASE WHEN "diseaseId" = 3 AND "diagnosticMethod" = 'Elisa IgM' THEN 1 ELSE 0 END) AS elisa_igm_zika,
            MAX(CASE WHEN "diseaseId" = 2 AND "diagnosticMethod" = 'RT-PCR en tiempo real' THEN 1 ELSE 0 END) AS rt_pcr_chikungunya,
            MAX(CASE WHEN "diseaseId" = 2 AND "diagnosticMethod" = 'Elisa IgM' THEN 1 ELSE 0 END) AS elisa_igm_chikungunya
        FROM test
        INNER JOIN sample s ON s.id = test."sampleId"
        GROUP BY "fileId"
    ) t_diag ON f.id = t_diag."fileId"
    LEFT JOIN (
        SELECT 
            "fileId",
            MAX(CASE WHEN "symptomId" = 1 THEN 1 ELSE 0 END) AS mialgia,
            MAX(CASE WHEN "symptomId" = 2 THEN 1 ELSE 0 END) AS fiebre,
            MAX(CASE WHEN "symptomId" = 3 THEN 1 ELSE 0 END) AS vomitos,
            MAX(CASE WHEN "symptomId" = 4 THEN 1 ELSE 0 END) AS cefalea,
            MAX(CASE WHEN "symptomId" = 5 THEN 1 ELSE 0 END) AS dolor_retro_orbitario,
            MAX(CASE WHEN "symptomId" = 6 THEN 1 ELSE 0 END) AS dolor_abdominal,
            MAX(CASE WHEN "symptomId" = 7 THEN 1 ELSE 0 END) AS letargia,
            MAX(CASE WHEN "symptomId" = 8 THEN 1 ELSE 0 END) AS irritabilidad,
            MAX(CASE WHEN "symptomId" = 9 THEN 1 ELSE 0 END) AS sangrado_mucosas,
            MAX(CASE WHEN "symptomId" = 10 THEN 1 ELSE 0 END) AS distres_respiratorio,
            MAX(CASE WHEN "symptomId" = 11 THEN 1 ELSE 0 END) AS choque,
            MAX(CASE WHEN "symptomId" = 12 THEN 1 ELSE 0 END) AS sangrado_grave,
            MAX(CASE WHEN "symptomId" = 13 THEN 1 ELSE 0 END) AS compromiso_organos,
            MAX(CASE WHEN "symptomId" = 14 THEN 1 ELSE 0 END) AS poliartralgias,
            MAX(CASE WHEN "symptomId" = 15 THEN 1 ELSE 0 END) AS poliartritis,
            MAX(CASE WHEN "symptomId" = 16 THEN 1 ELSE 0 END) AS exantema,
            MAX(CASE WHEN "symptomId" = 17 THEN 1 ELSE 0 END) AS exantema_maculopapular,
            MAX(CASE WHEN "symptomId" = 18 THEN 1 ELSE 0 END) AS conjuntivitis_no_purulenta,
            MAX(CASE WHEN "symptomId" = 19 THEN 1 ELSE 0 END) AS artralgia,
            MAX(CASE WHEN "symptomId" = 20 THEN 1 ELSE 0 END) AS edema_periarticular,
            MAX(CASE WHEN "symptomId" = 21 THEN 1 ELSE 0 END) AS petequias_prueba_torniquete
        FROM diseasesymptomfile
        GROUP BY "fileId"
    ) ds ON f.id = ds."fileId"
    WHERE (p_laboratory_id IS NULL OR t."laboratoryId" = p_laboratory_id)
        AND (p_symptoms_date_from IS NULL OR f."symptomsDate" >= p_symptoms_date_from)
        AND (p_symptoms_date_to IS NULL OR f."symptomsDate" <= p_symptoms_date_to)
        AND (p_notification_date_from IS NULL OR f."registerDate" >= p_notification_date_from)
        AND (p_notification_date_to IS NULL OR f."registerDate" <= p_notification_date_to)
        AND (p_result_date_from IS NULL OR f."registerDate" >= p_result_date_from)
        AND (p_result_date_to IS NULL OR f."registerDate" <= p_result_date_to)
        AND (p_test_result IS NULL OR t.result ILIKE '%' || p_test_result || '%')
        AND (p_diagnostic_method IS NULL OR t."diagnosticMethod" ILIKE '%' || p_diagnostic_method || '%')
        AND (p_department IS NULL OR c.state ILIKE '%' || p_department || '%')
        AND (p_health_network IS NULL OR h.network ILIKE '%' || p_health_network || '%')
        AND (p_municipality IS NULL OR c.municipality ILIKE '%' || p_municipality || '%')
        AND (p_establishment IS NULL OR h.name ILIKE '%' || p_establishment || '%')
        AND (p_subsector IS NULL OR h."typeHospital" = p_subsector)
    GROUP BY 
        f.id, p.ci, p.name, p."lastName", p."secondLastName", p."birthDate",
        p.gender, pr."childBirthDate", c.state, c.municipality, c.neighborhood, 
        dtn.neighborhood, dtn.latitude, dtn.longitude, p.phone, h.name, lab.name, f."symptomsDate", 
        s."sampleCollectionDate", f."registerDate", t.result, t.observation, d.id;
END;
$$;



--
-- TOC entry 277 (class 1255 OID 16851)
-- Name: ufc_update_file(character varying, character varying, character varying, character, character varying, date, character varying, character varying, date, date, character varying, character varying, character varying, character varying, integer, character varying, character varying, character varying, character varying, integer, character varying, character varying, character varying, character varying, character varying, date, smallint, character varying, date, smallint, character varying, character varying, date, character varying, date, character varying, character varying, character varying, character varying, integer, character varying, date, text, character varying, character varying, character varying, integer, integer, integer[], character varying[], bigint, integer, integer, integer, integer, integer, bigint, bigint, integer, bigint, integer, integer, integer, integer); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_update_file(p_patient_name character varying, p_patient_lastname character varying, p_patient_secondlastname character varying, p_patient_gender character, p_patient_ci character varying, p_patient_birthdate date, p_patient_phone character varying, p_patient_code character varying, p_pregnant_lastmenstruationdate date, p_pregnant_childbirthdate date, p_pregnant_disease character varying, p_child_parent character varying, p_ip_typeinsured character varying, p_ip_insuredrecord character varying, p_insurance_id integer, p_direction_city character varying, p_direction_neighborhood character varying, p_direction_latitude character varying, p_direction_longitude character varying, p_direction_municipality_id integer, p_contagion_neighborhood character varying, p_contagion_city character varying, p_contagion_municipality character varying, p_contagion_state character varying, p_contagion_country character varying, p_hospitalized_entrydate date, p_hospitalized_type smallint, p_hospitalized_name character varying, p_u_entrydate date, p_u_type smallint, p_u_name character varying, p_dh_dischargetype character varying, p_dh_dischargedate date, p_file_code character varying, p_file_symptomsdate date, p_file_discoverymethod character varying, p_file_epideweek character varying, p_case_casetype character varying, p_case_method character varying, p_case_disease_id integer, p_sample_sampletype character varying, p_sample_collectiondate date, p_sample_observation text, p_test_diagnosticmethod character varying, p_test_result character varying, p_test_observation character varying, p_test_laboratory_id integer, p_user_id integer, p_symptoms integer[], p_is_symptoms_present character varying[], p_patient_id bigint, p_direction_id integer, p_ip_id integer, p_pregnat_id integer, p_child_id integer, p_contagion_id integer, p_hospitalized_id bigint, p_u_id bigint, p_dh_id integer, p_file_id bigint, p_case_id integer, p_ds_id integer, p_sample_id integer, p_test_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    total_updates INTEGER := 0;

BEGIN
    -- Update "patient"
    UPDATE public.patient
    SET name = p_patient_name,
        "lastName" = p_patient_lastName,
        "secondLastName" = p_patient_SecondLastName,
        gender = p_patient_gender,
        ci = p_patient_ci,
        "birthDate" = p_patient_birthDate,
        phone = p_patient_phone,
        code = p_patient_code,
		"lastUpdate" = CURRENT_TIMESTAMP,
        "lastUpdateUserId" = p_user_Id
    WHERE id = p_patient_Id;

    total_updates := total_updates + 1;

    -- Update "direction"
    UPDATE public.direction
    SET city = p_direction_city,
        neighborhood = p_direction_neighborhood,
        latitude = p_direction_latitude,
        longitude = p_direction_longitude,
        "municipalityId" = p_direction_municipality_Id
    WHERE id = p_direction_Id;

    total_updates := total_updates + 1;

    -- Update "insurancePatient"
    IF p_insurance_Id IS NOT NULL THEN
        UPDATE public."insurancePatient"
        SET "typeInsured" = p_ip_typeInsured,
            "insuredRecord" = p_ip_insuredRecord,
            "insuranceId" = p_insurance_Id
        WHERE id = p_ip_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "pregnant"
    IF p_pregnant_lastMenstruationDate IS NOT NULL THEN
        UPDATE public.pregnant
        SET "lastMenstruationDate" = p_pregnant_lastMenstruationDate,
            "childBirthDate" = p_pregnant_childBirthDate,
            disease = p_pregnant_disease
        WHERE id = p_pregnat_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "child"
    IF p_child_parent IS NOT NULL THEN
        UPDATE public.child
        SET parent = p_child_parent
        WHERE id = p_child_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "contagion"
    UPDATE public.contagion
    SET neighborhood = p_contagion_neighborhood,
        city = p_contagion_city,
        municipality = p_contagion_municipality,
        state = p_contagion_state,
        country = p_contagion_country
    WHERE id = p_contagion_Id;

    total_updates := total_updates + 1;

    -- Update "hospitalized"
    IF p_hospitalized_name IS NOT NULL THEN
        UPDATE public.hospitalized
        SET "entryDate" = p_hospitalized_entryDate,
            type = p_hospitalized_type,
            "hospitalName" = p_hospitalized_name
        WHERE id = p_hospitalized_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "hospitalized" UTI
    IF p_U_name IS NOT NULL THEN
        UPDATE public.hospitalized
        SET "entryDate" = p_U_entryDate,
            type = p_U_type,
            "hospitalName" = p_U_name
        WHERE id = p_u_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "dischargehospitalized"
    IF p_dh_dischargeType IS NOT NULL THEN
        UPDATE public.dischargehospitalized
        SET "dischargeType" = p_dh_dischargeType,
            "dischargeDate" = p_dh_dischargeDate
        WHERE id = p_dh_Id;

        total_updates := total_updates + 1;
    END IF;

    -- Update "file"
    UPDATE public.file
    SET code = p_file_code,
        "symptomsDate" = p_file_symptomsDate,
        "discoveryMethod" = p_file_discoveryMethod,
        "epidemiologicalWeek" = p_file_epideWeek,
		"lastUpdate" = CURRENT_TIMESTAMP,
        "lastUpdateUserId" = p_user_Id
    WHERE id = p_file_Id;

    total_updates := total_updates + 1;

    -- Update "case"
    UPDATE public."case"
    SET "caseType" = p_case_caseType,
        method = p_case_method,
        "diseaseId" = p_case_disease_Id
    WHERE id = p_case_Id;

    total_updates := total_updates + 1;

    -- Update "diseasesymptomfile"
    FOR i IN 1..array_length(p_symptoms, 1) LOOP
        UPDATE public.diseasesymptomfile
        SET "symptomPresent" = p_is_symptoms_present[i]
        WHERE "diseaseId" = p_case_disease_Id
          AND "symptomId" = p_symptoms[i]
          AND id = p_ds_Id;

        total_updates := total_updates + 1;
    END LOOP;

    -- Update "sample"
    UPDATE public.sample
    SET "sampleType" = p_sample_sampleType,
        "sampleCollectionDate" = p_sample_CollectionDate,
        observation = p_sample_observation
    WHERE id = p_sample_Id;

    total_updates := total_updates + 1;

    -- Update "test"
    UPDATE public.test
    SET "diagnosticMethod" = p_test_diagnosticMethod,
        result = p_test_result,
        observation = p_test_observation,
		"lastUpdate" = CURRENT_TIMESTAMP,
		"lastUpdateUserId" = p_user_Id,
        "laboratoryId" = p_test_laboratory_Id
    WHERE id = p_test_Id;

    total_updates := total_updates + 1;

    RETURN total_updates;
END;
$$;



--
-- TOC entry 278 (class 1255 OID 16874)
-- Name: ufc_update_test_sample(bigint, character varying, text, character varying, character varying, text, integer, character varying, character varying); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufc_update_test_sample(p_file_id bigint, p_sample_type character varying, p_sample_observation text, p_test_diagnostic_method character varying, p_test_result character varying, p_test_observation text, p_last_update_user_id integer, p_case_type character varying, p_case_method character varying) RETURNS TABLE(file_id bigint, sample_type character varying, sample_observation text, test_diagnostic_method character varying, test_result character varying, test_observation text, last_update_user_id integer, case_type character varying, case_method character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
    p_test_id BIGINT := 0;
    p_sample_id BIGINT := 0;
	p_case_id INTEGER := 0;
	
BEGIN

    -- Obtener el ID de Sample
    SELECT s.id
    INTO p_sample_id
    FROM sample s
    WHERE s."fileId" = p_file_id
    LIMIT 1;

	-- Obtener el ID de Test
    SELECT t.id
    INTO p_test_id
    FROM test t
    WHERE t."sampleId" = p_sample_id
    LIMIT 1;

	-- Obtener el ID de Case
	SELECT c.id
	INTO p_case_id
	FROM "case" c
	WHERE c."fileId" = p_file_id
	LIMIT 1;

    -- Sample
    UPDATE sample
    SET 
        "sampleType" = p_sample_type,
        observation = p_sample_observation,
		"status" = 'Con resultado'
    WHERE id = p_sample_id;

    -- Test
    UPDATE test
    SET 
        "diagnosticMethod" = p_test_diagnostic_method,
        "result" = p_test_result,
        observation = p_test_observation,
        "lastUpdate" = CURRENT_TIMESTAMP,
        "lastUpdateUserId" = p_last_update_user_id
    WHERE id = p_test_id;

	UPDATE "case"
	SET
		"caseType" = p_case_type,
		"method" = p_case_method
	WHERE id = p_case_id;

	-- File
	UPDATE "file"
	SET
		"status" = 1
	WHERE id = p_file_id;

    RETURN QUERY
	SELECT 
			p_file_id,
	        p_sample_type,
	        p_sample_observation,
	        p_test_diagnostic_method,
	        p_test_result,
	        p_test_observation,
	        p_last_update_user_id,
	 		p_case_type,
			p_case_method;
			
END;
$$;



--
-- TOC entry 282 (class 1255 OID 16900)
-- Name: ufchistoryfiledoctor(bigint); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufchistoryfiledoctor(p_hospitalid bigint DEFAULT NULL::bigint) RETURNS TABLE(id bigint, result character varying, status smallint, code character varying, ci character varying, names character varying, lastname character varying, secondlastname character varying, birthdate date, registerdate timestamp without time zone, diseasename character varying, codepatient character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
	    SELECT 
	        f.id, t.result, f.status, f.code, p.ci, p.name, p."lastName", p."secondLastName", p."birthDate", f."registerDate", ds.name, p.code
	    	
		FROM 
	        patient p
	    INNER JOIN file f ON p.id = f."patientId"
	    INNER JOIN sample s ON f.id = s."fileId"        
	    INNER JOIN test t ON s.id = t."sampleId"
	    INNER JOIN doctor d ON d."userId" = f."userId"
	    INNER JOIN hospital h ON h.id = d."hospitalId"
		INNER JOIN disease ds ON ds.id = t."diseaseId"
	    WHERE (p_hospitalid IS NULL OR h.id = p_hospitalid)
		ORDER BY f."registerDate" DESC;
END;
$$;



--
-- TOC entry 280 (class 1255 OID 16898)
-- Name: ufchistoryfilefilterh(bigint, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufchistoryfilefilterh(p_id bigint DEFAULT NULL::bigint, p_code character varying DEFAULT NULL::character varying, p_ci character varying DEFAULT NULL::character varying, p_names character varying DEFAULT NULL::character varying, p_lastname character varying DEFAULT NULL::character varying, p_secondlastname character varying DEFAULT NULL::character varying, p_codepatient character varying DEFAULT NULL::character varying) RETURNS TABLE(id bigint, result character varying, status smallint, code character varying, ci character varying, names character varying, lastname character varying, secondlastname character varying, birthdate date, registerdate timestamp without time zone, diseasename character varying, codepatient character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
	SELECT DISTINCT
	        f.id, t.result, f.status, f.code, p.ci, p.name, p."lastName", p."secondLastName", p."birthDate", f."registerDate", ds.name, p.code
	    	
		FROM 
	        patient p
	    INNER JOIN file f ON p.id = f."patientId"
	    INNER JOIN sample s ON f.id = s."fileId"        
	    INNER JOIN test t ON s.id = t."sampleId"
	    INNER JOIN doctor d ON d."userId" = f."userId"
	    INNER JOIN hospital h ON h.id = d."hospitalId"
		INNER JOIN disease ds ON ds.id = t."diseaseId"
	    WHERE (p_id IS NULL OR h.id = p_id)
		AND (p_code IS NULL OR (f.code) ILIKE '%' || p_code || '%')
		AND (p_codePatient IS NULL OR (p.code) ILIKE '%' || p_codePatient || '%')
		AND (p_ci IS NULL OR (p.ci) ILIKE '%' || p_ci || '%')
		AND (p_names IS NULL OR (p.name) ILIKE '%' || p_names || '%' )
		AND (p_lastName IS NULL OR (p."lastName") ILIKE '%' || p_lastName || '%' )
		AND (p_secondLastName IS NULL OR (p."secondLastName") ILIKE '%' || p_secondLastName || '%' );
END;
$$;



--
-- TOC entry 279 (class 1255 OID 16897)
-- Name: ufchistoryfilefilterl(bigint, character varying, character varying, character varying, character varying, character varying, character varying); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufchistoryfilefilterl(p_id bigint DEFAULT NULL::bigint, p_code character varying DEFAULT NULL::character varying, p_ci character varying DEFAULT NULL::character varying, p_names character varying DEFAULT NULL::character varying, p_lastname character varying DEFAULT NULL::character varying, p_secondlastname character varying DEFAULT NULL::character varying, p_codepatient character varying DEFAULT NULL::character varying) RETURNS TABLE(id bigint, result character varying, status smallint, code character varying, ci character varying, names character varying, lastname character varying, secondlastname character varying, birthdate date, registerdate timestamp without time zone, diseasename character varying, codepatient character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
	SELECT DISTINCT f.id, t.result, f.status, f.code, p.ci, p.name, p."lastName", p."secondLastName", p."birthDate", f."registerDate", d.name, p.code
    FROM patient p
    INNER JOIN file f ON p.id = f."patientId"
    INNER JOIN sample s ON f.id = s."fileId"        
    INNER JOIN test t ON s.id = t."sampleId"
	INNER JOIN disease d ON d.id = t."diseaseId"
	WHERE (p_id IS NULL OR T."laboratoryId" = p_id)
		AND (p_code IS NULL OR (f.code) ILIKE '%' || p_code || '%')
		AND (p_codePatient IS NULL OR (p.code) ILIKE '%' || p_codePatient || '%')
		AND (p_ci IS NULL OR (p.ci) ILIKE '%' || p_ci || '%')
		AND (p_names IS NULL OR (p.name) ILIKE '%' || p_names || '%' )
		AND (p_lastName IS NULL OR (p."lastName") ILIKE '%' || p_lastName || '%' )
		AND (p_secondLastName IS NULL OR (p."secondLastName") ILIKE '%' || p_secondLastName || '%' );
END;
$$;



--
-- TOC entry 281 (class 1255 OID 16899)
-- Name: ufchistorylab(integer); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufchistorylab(laboratoryid integer DEFAULT NULL::integer) RETURNS TABLE(id bigint, result character varying, status smallint, code character varying, ci character varying, names character varying, lastname character varying, secondlastname character varying, birthdate date, registerdate timestamp without time zone, diseasename character varying, codepatient character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT f.id, t.result, f.status, f.code, p.ci, p.name, p."lastName", p."secondLastName", p."birthDate", f."registerDate", d.name, p.code
    FROM patient p
    INNER JOIN file f ON p.id = f."patientId"
    INNER JOIN sample s ON f.id = s."fileId"        
    INNER JOIN test t ON s.id = t."sampleId"
	INNER JOIN disease d ON d.id = t."diseaseId"
	WHERE (laboratoryid IS NULL OR T."laboratoryId" = laboratoryid)
	ORDER BY f."registerDate" DESC;
END;
$$;



--
-- TOC entry 276 (class 1255 OID 16773)
-- Name: ufcsamplelist(integer, text, integer, timestamp with time zone); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufcsamplelist(psamplecode integer DEFAULT NULL::integer, ppatientname text DEFAULT NULL::text, pdisease integer DEFAULT NULL::integer, pregisterdate timestamp with time zone DEFAULT NULL::timestamp with time zone) RETURNS TABLE(id bigint, registerhour text, registerdate date, patientfullname text, diseaseid integer, diseasename character varying, samplemanager text, contact character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
	RETURN QUERY
	SELECT DISTINCT s.id AS "sampleId",
    to_char(s."registerDate", 'HH24:MI'::text) AS "registerHour",
    DATE(s."registerDate"),
    concat(p.name, ' ', p."lastName", ' ', COALESCE(p."secondLastName", ''::character varying)) AS "patientFullName",
		d.id AS diseaseId,
    d.name AS "diseaseName",
    concat(sm.name, ' ', sm."lastName", ' ', COALESCE(sm."secondLastName", ''::character varying)) AS "sampleManager",
    sm.phone AS contact
   FROM sample s
     JOIN file f ON f.id = s."fileId"
     JOIN patient p ON p.id = f."patientId"
     JOIN diseasesymptomfile ds ON ds."fileId" = f.id
     JOIN disease d ON d.id = ds."diseaseId"
     LEFT JOIN "sampleManager" sm ON sm."sampleId" = s.id
	WHERE (pSampleCode IS NULL OR s.id = pSampleCode)
	AND (pPatientName IS NULL OR (p.name || ' ' || p."lastName" || ' ' || COALESCE(p."secondLastName", '')) ILIKE '%' || pPatientName || '%')
	AND (pDisease IS NULL OR d."id" = pDisease)
	AND (pRegisterDate IS NULL OR DATE(s."registerDate") = pRegisterDate);
END;
$$;



--
-- TOC entry 283 (class 1255 OID 16921)
-- Name: ufcuserauth(character varying, character varying); Type: FUNCTION; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE FUNCTION public.ufcuserauth(p_username character varying, p_password character varying) RETURNS TABLE(userid integer, username character varying, role character varying, password character varying, status smallint, firstlogin smallint, extra_info jsonb)
    LANGUAGE plpgsql
    AS $$
DECLARE 
	user_id INTEGER;
	user_role CHARACTER VARYING(60);
	user_name CHARACTER VARYING(60);
	user_password CHARACTER VARYING(100);
	user_firstlogin SMALLINT;
	user_status SMALLINT;
BEGIN
	SELECT U.id, U."username", U."role", U."password", U."firstLogin", U."status"
	INTO user_id, user_name, user_role, user_password, user_firstlogin, user_status
	FROM "user" U 
	WHERE U."username" = p_username;

	IF NOT FOUND THEN 
		RAISE EXCEPTION 'Usuario o contraseña incorrecta';
	END IF;

	IF(user_role = 'Doctor') THEN
		RETURN QUERY
		SELECT user_id, user_name, user_role, user_password, user_status, user_firstlogin,
		JSONB_BUILD_OBJECT(
			'names', D."name", 
			'lastName', D."lastName", 
			'secondLastName', D."secondLastName", 
			'phone', D."phone", 
			'email',D."email",
			'hospitalId', H.id,
			'hospital',H."name", 
			'hospitalContact',H."contact", 
			'hospitalNetwork',H."network", 
			'state',S."name", 
			'municipality',M."name"
		)
			FROM "doctor" D
			INNER JOIN hospital H ON H.id = D."hospitalId"
			INNER JOIN municipality M ON M.id = H."municipalityId"
			INNER JOIN state S ON S.id = M."stateId"
			WHERE D."userId" = user_id;
	ELSIF (user_role = 'Employee' OR user_role = 'Admin') THEN
		RETURN QUERY
        SELECT user_id, user_name, user_role, user_password, user_status, user_firstlogin,
               JSONB_BUILD_OBJECT(
                   'names', E."names",
                   'lastName', E."lastName",
                   'secondLastName', E."secondLastName",
					'laboratoryId', L.id,
                   'laboratory', L."name",
					'state', S."name",
					'municipality', M."name",
					'laboNetwork', L."network"
               )
        FROM "employee" E
        INNER JOIN laboratory L ON L.id = E."laboratoryId"
		INNER JOIN municipality M ON M.id = L."municipalityId"
		INNER JOIN state S ON S.id = M."stateId"
        WHERE E."userId" = user_id;
	END IF;	
END;
$$;



SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16400)
-- Name: case; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public."case" (
    id integer NOT NULL,
    "caseType" character varying(15) NOT NULL,
    method character varying(30),
    "diseaseId" integer NOT NULL,
    "fileId" bigint NOT NULL
);



--
-- TOC entry 3629 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE "case"; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public."case" IS 'caseType es "Confirmado" o "Sospechoso", method es "Por Laboratorio" o "Por Nexo Epidemiológico"';


--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: case_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public."case" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.case_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 218 (class 1259 OID 16406)
-- Name: child; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.child (
    id integer NOT NULL,
    parent character varying(120),
    "patientId" bigint NOT NULL
);



--
-- TOC entry 217 (class 1259 OID 16405)
-- Name: child_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.child ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.child_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 220 (class 1259 OID 16412)
-- Name: contagion; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.contagion (
    id integer NOT NULL,
    neighborhood character varying(100),
    city character varying(100),
    municipality character varying(100),
    state character varying(100),
    country character varying(100) NOT NULL,
    "patientId" bigint NOT NULL
);



--
-- TOC entry 219 (class 1259 OID 16411)
-- Name: contagion_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.contagion ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.contagion_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 222 (class 1259 OID 16420)
-- Name: country; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);



--
-- TOC entry 221 (class 1259 OID 16419)
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.country ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.country_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 224 (class 1259 OID 16426)
-- Name: direction; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.direction (
    id integer NOT NULL,
    city character varying(100),
    neighborhood character varying(200),
    latitude character varying(60) NOT NULL,
    longitude character varying(60) NOT NULL,
    "municipalityId" integer NOT NULL,
    "patientId" bigint NOT NULL
);



--
-- TOC entry 223 (class 1259 OID 16425)
-- Name: direction_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.direction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.direction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 226 (class 1259 OID 16432)
-- Name: dischargehospitalized; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.dischargehospitalized (
    id integer NOT NULL,
    "dischargeType" character varying(18) NOT NULL,
    "dischargeDate" date,
    "hospitalizedId" bigint NOT NULL
);



--
-- TOC entry 225 (class 1259 OID 16431)
-- Name: dischargehospitalized_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.dischargehospitalized ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.dischargehospitalized_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 228 (class 1259 OID 16438)
-- Name: disease; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.disease (
    id integer NOT NULL,
    name character varying(60) NOT NULL
);



--
-- TOC entry 227 (class 1259 OID 16437)
-- Name: disease_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.disease ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.disease_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 230 (class 1259 OID 16444)
-- Name: diseasesymptomfile; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.diseasesymptomfile (
    id integer NOT NULL,
    "symptomPresent" character varying(50) NOT NULL,
    "diseaseId" integer NOT NULL,
    "symptomId" integer NOT NULL,
    "fileId" bigint NOT NULL
);



--
-- TOC entry 3630 (class 0 OID 0)
-- Dependencies: 230
-- Name: TABLE diseasesymptomfile; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.diseasesymptomfile IS 'S ';


--
-- TOC entry 229 (class 1259 OID 16443)
-- Name: diseasesymptomfile_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.diseasesymptomfile ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.diseasesymptomfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 232 (class 1259 OID 16450)
-- Name: doctor; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.doctor (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "lastName" character varying(50) NOT NULL,
    "secondLastName" character varying(50),
    phone character varying(10) NOT NULL,
    email character varying(50) NOT NULL,
    sedes character varying(20),
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone,
    "userId" integer NOT NULL,
    "hospitalId" integer NOT NULL
);



--
-- TOC entry 231 (class 1259 OID 16449)
-- Name: doctor_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.doctor ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.doctor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 234 (class 1259 OID 16457)
-- Name: employee; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.employee (
    id integer NOT NULL,
    names character varying(60) NOT NULL,
    "lastName" character varying(60) NOT NULL,
    "secondLastName" character varying(60),
    phone character varying(10) NOT NULL,
    "userId" integer NOT NULL,
    "laboratoryId" integer NOT NULL,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone,
    email character varying(80) NOT NULL
);



--
-- TOC entry 233 (class 1259 OID 16456)
-- Name: employee_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.employee ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.employee_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 236 (class 1259 OID 16464)
-- Name: file; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.file (
    id bigint NOT NULL,
    code character varying(10) NOT NULL,
    "symptomsDate" date NOT NULL,
    "discoveryMethod" character varying(200) NOT NULL,
    "epidemiologicalWeek" character varying(4) NOT NULL,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone,
    status smallint DEFAULT 0 NOT NULL,
    "userId" integer NOT NULL,
    "lastUpdateUserId" integer,
    "patientId" bigint NOT NULL
);



--
-- TOC entry 3631 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE file; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.file IS 'userId es el pk del que llenó la ficha, lastUpdateUserId = ultimo usuario que modifico la ficha,
status 0 = pendiente(Sin resultado), status 1 = revisado(Con resultado), status 2 = eliminado';


--
-- TOC entry 3632 (class 0 OID 0)
-- Dependencies: 236
-- Name: COLUMN file.status; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON COLUMN public.file.status IS 'Estado de la ficha(pendiente = 0, revisado = 1)';


--
-- TOC entry 235 (class 1259 OID 16463)
-- Name: file_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.file ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.file_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 238 (class 1259 OID 16472)
-- Name: hospital; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.hospital (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    contact character varying(60),
    network character varying(5) NOT NULL,
    "snisCode" character varying(10) NOT NULL,
    "typeHospital" smallint NOT NULL,
    comunity text,
    "municipalityId" integer NOT NULL
);



--
-- TOC entry 3633 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE hospital; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.hospital IS 'network es la columna para Red de Salud
type es la columna TipoHospital, 1 = publico, 2 = privado, 3 = seguro salud, 4 = otro
comunity = localidad/comunidad';


--
-- TOC entry 237 (class 1259 OID 16471)
-- Name: hospital_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.hospital ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hospital_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 240 (class 1259 OID 16480)
-- Name: hospitalized; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.hospitalized (
    id bigint NOT NULL,
    "entryDate" date,
    type smallint NOT NULL,
    "hospitalName" character varying(100),
    "patientId" bigint NOT NULL
);



--
-- TOC entry 3634 (class 0 OID 0)
-- Dependencies: 240
-- Name: TABLE hospitalized; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.hospitalized IS 'type = 0 Hospitalized normal, type = 1 UTI';


--
-- TOC entry 239 (class 1259 OID 16479)
-- Name: hospitalized_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.hospitalized ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.hospitalized_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 242 (class 1259 OID 16486)
-- Name: insurance; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.insurance (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    transmitter character varying(100) NOT NULL
);



--
-- TOC entry 3635 (class 0 OID 0)
-- Dependencies: 242
-- Name: TABLE insurance; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.insurance IS 'Tabla "Seguro", columna "transmitter" es para la empresa dueña del seguro';


--
-- TOC entry 244 (class 1259 OID 16492)
-- Name: insurancePatient; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public."insurancePatient" (
    id integer NOT NULL,
    "typeInsured" character varying(60) NOT NULL,
    "insuredRecord" character varying(20) NOT NULL,
    "patientId" bigint NOT NULL,
    "insuranceId" integer NOT NULL
);



--
-- TOC entry 3636 (class 0 OID 0)
-- Dependencies: 244
-- Name: TABLE "insurancePatient"; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public."insurancePatient" IS 'columna "insuredRecord" es para la matricula del paciente, columna "typeInsured" es para especificar el tipo de asegurado';


--
-- TOC entry 243 (class 1259 OID 16491)
-- Name: insurancePatient_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public."insurancePatient" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."insurancePatient_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 241 (class 1259 OID 16485)
-- Name: insurance_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.insurance ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.insurance_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 246 (class 1259 OID 16498)
-- Name: laboratory; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.laboratory (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    network character varying(5) NOT NULL,
    "codeConalab" character varying(7) NOT NULL,
    type character varying(20) NOT NULL,
    level character varying(1) NOT NULL,
    "municipalityId" integer NOT NULL
);



--
-- TOC entry 245 (class 1259 OID 16497)
-- Name: laboratory_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.laboratory ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.laboratory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 248 (class 1259 OID 16504)
-- Name: municipality; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.municipality (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    "stateId" integer NOT NULL
);



--
-- TOC entry 247 (class 1259 OID 16503)
-- Name: municipality_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.municipality ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.municipality_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 250 (class 1259 OID 16510)
-- Name: patient; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.patient (
    id bigint NOT NULL,
    name character varying(60) NOT NULL,
    "lastName" character varying(60) NOT NULL,
    "secondLastName" character varying(60),
    gender character(1) NOT NULL,
    ci character varying(30) NOT NULL,
    "birthDate" date NOT NULL,
    phone character varying(10) NOT NULL,
    code character varying(7) NOT NULL,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone,
    "userId" integer NOT NULL,
    "lastUpdateUserId" integer
);



--
-- TOC entry 3637 (class 0 OID 0)
-- Dependencies: 250
-- Name: TABLE patient; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.patient IS 'gender = F o M, lastUpdateUserId = id del ultimo usuario que modifico el registro, userId = usuario que creo el registro';


--
-- TOC entry 249 (class 1259 OID 16509)
-- Name: patient_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.patient ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.patient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 252 (class 1259 OID 16517)
-- Name: pregnant; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.pregnant (
    id integer NOT NULL,
    "lastMenstruationDate" date NOT NULL,
    "childBirthDate" date NOT NULL,
    disease character varying(200) DEFAULT 'Sin enfermedades'::character varying NOT NULL,
    "patientId" bigint NOT NULL
);



--
-- TOC entry 251 (class 1259 OID 16516)
-- Name: pregnant_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.pregnant ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.pregnant_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 254 (class 1259 OID 16524)
-- Name: sample; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.sample (
    id bigint NOT NULL,
    "sampleType" character varying(50) NOT NULL,
    "sampleCollectionDate" date NOT NULL,
    observation text,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(15) DEFAULT 'Sin resultado'::character varying NOT NULL,
    "fileId" bigint NOT NULL
);



--
-- TOC entry 3638 (class 0 OID 0)
-- Dependencies: 254
-- Name: TABLE sample; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public.sample IS 'status "Con resultado" o "Sin resultado"';


--
-- TOC entry 256 (class 1259 OID 16534)
-- Name: sampleManager; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public."sampleManager" (
    id bigint NOT NULL,
    name character varying(60) NOT NULL,
    "lastName" character varying(60) NOT NULL,
    "secondLastName" character varying(60),
    phone character varying(15),
    "sampleId" bigint NOT NULL
);



--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 256
-- Name: TABLE "sampleManager"; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public."sampleManager" IS 'persona que entregó la muestra';


--
-- TOC entry 255 (class 1259 OID 16533)
-- Name: sampleManager_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public."sampleManager" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."sampleManager_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 253 (class 1259 OID 16523)
-- Name: sample_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.sample ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.sample_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 258 (class 1259 OID 16540)
-- Name: state; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.state (
    id integer NOT NULL,
    name character varying(60) NOT NULL,
    "countryId" integer NOT NULL
);



--
-- TOC entry 257 (class 1259 OID 16539)
-- Name: state_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.state ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.state_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 260 (class 1259 OID 16546)
-- Name: symptom; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.symptom (
    id integer NOT NULL,
    "symptomName" character varying(100) NOT NULL
);



--
-- TOC entry 259 (class 1259 OID 16545)
-- Name: symptom_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.symptom ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.symptom_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 262 (class 1259 OID 16552)
-- Name: test; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public.test (
    id integer NOT NULL,
    "diagnosticMethod" character varying(50),
    result character varying(10),
    observation text,
    "registerDate" timestamp without time zone DEFAULT now() NOT NULL,
    "lastUpdate" timestamp without time zone,
    "userId" integer NOT NULL,
    "lastUpdateUserId" integer,
    "sampleId" bigint NOT NULL,
    "diseaseId" integer NOT NULL,
    "laboratoryId" integer NOT NULL
);



--
-- TOC entry 261 (class 1259 OID 16551)
-- Name: test_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public.test ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.test_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 264 (class 1259 OID 16559)
-- Name: user; Type: TABLE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(60) NOT NULL,
    password character varying(100) NOT NULL,
    role character varying(60) NOT NULL,
    status smallint DEFAULT 1 NOT NULL,
    "firstLogin" smallint DEFAULT 0 NOT NULL
);


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 264
-- Name: TABLE "user"; Type: COMMENT; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

COMMENT ON TABLE public."user" IS 'status = 1 activo, status = 0 inactivo, status = 2 eliminado, firstLogin = 0 sin primer inicio de sesion, firstLogin = 1 con primer inicio de sesion';


--
-- TOC entry 263 (class 1259 OID 16558)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: bdd_laboratorio_mosquito_user
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);