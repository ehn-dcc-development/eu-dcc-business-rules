<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:2c21fbb5-aee1-4a10-8194-bdbbba48550a(ValidationRules.structure)">
  <persistence version="9" />
  <languages>
    <use id="c72da2b9-7cce-4447-8389-f407dc1158b7" name="jetbrains.mps.lang.structure" version="9" />
    <devkit ref="78434eb8-b0e5-444b-850d-e7c4ad2da9ab(jetbrains.mps.devkit.aspect.structure)" />
  </languages>
  <imports>
    <import index="u3iy" ref="r:c849d378-e965-4689-a87a-8119028c50b2(CertLogic.structure)" />
    <import index="tpck" ref="r:00000000-0000-4000-0000-011c89590288(jetbrains.mps.lang.core.structure)" implicit="true" />
  </imports>
  <registry>
    <language id="c72da2b9-7cce-4447-8389-f407dc1158b7" name="jetbrains.mps.lang.structure">
      <concept id="3348158742936976480" name="jetbrains.mps.lang.structure.structure.EnumerationMemberDeclaration" flags="ng" index="25R33">
        <property id="1421157252384165432" name="memberId" index="3tVfz5" />
        <property id="672037151186491528" name="presentation" index="1L1pqM" />
      </concept>
      <concept id="3348158742936976479" name="jetbrains.mps.lang.structure.structure.EnumerationDeclaration" flags="ng" index="25R3W">
        <reference id="1075010451642646892" name="defaultMember" index="1H5jkz" />
        <child id="3348158742936976577" name="members" index="25R1y" />
      </concept>
      <concept id="1082978164218" name="jetbrains.mps.lang.structure.structure.DataTypeDeclaration" flags="ng" index="AxPO6">
        <property id="7791109065626895363" name="datatypeId" index="3F6X1D" />
      </concept>
      <concept id="1082978499127" name="jetbrains.mps.lang.structure.structure.ConstrainedDataTypeDeclaration" flags="ng" index="Az7Fb">
        <property id="1083066089218" name="constraint" index="FLfZY" />
      </concept>
      <concept id="1169125787135" name="jetbrains.mps.lang.structure.structure.AbstractConceptDeclaration" flags="ig" index="PkWjJ">
        <property id="6714410169261853888" name="conceptId" index="EcuMT" />
        <property id="5092175715804935370" name="conceptAlias" index="34LRSv" />
        <child id="1071489727083" name="linkDeclaration" index="1TKVEi" />
        <child id="1071489727084" name="propertyDeclaration" index="1TKVEl" />
      </concept>
      <concept id="1169127622168" name="jetbrains.mps.lang.structure.structure.InterfaceConceptReference" flags="ig" index="PrWs8">
        <reference id="1169127628841" name="intfc" index="PrY4T" />
      </concept>
      <concept id="1071489090640" name="jetbrains.mps.lang.structure.structure.ConceptDeclaration" flags="ig" index="1TIwiD">
        <property id="1096454100552" name="rootable" index="19KtqR" />
        <reference id="1071489389519" name="extends" index="1TJDcQ" />
        <child id="1169129564478" name="implements" index="PzmwI" />
      </concept>
      <concept id="1071489288299" name="jetbrains.mps.lang.structure.structure.PropertyDeclaration" flags="ig" index="1TJgyi">
        <property id="241647608299431129" name="propertyId" index="IQ2nx" />
        <reference id="1082985295845" name="dataType" index="AX2Wp" />
      </concept>
      <concept id="1071489288298" name="jetbrains.mps.lang.structure.structure.LinkDeclaration" flags="ig" index="1TJgyj">
        <property id="1071599776563" name="role" index="20kJfa" />
        <property id="1071599893252" name="sourceCardinality" index="20lbJX" />
        <property id="1071599937831" name="metaClass" index="20lmBu" />
        <property id="241647608299431140" name="linkId" index="IQ2ns" />
        <reference id="1071599976176" name="target" index="20lvS9" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
  </registry>
  <node concept="25R3W" id="6ItNp1oo1qz">
    <property role="3F6X1D" value="7754580153243539107" />
    <property role="TrG5h" value="MemberState" />
    <ref role="1H5jkz" node="6ItNp1oo1q$" resolve="EU" />
    <node concept="25R33" id="6ItNp1oo1q$" role="25R1y">
      <property role="3tVfz5" value="7754580153243539108" />
      <property role="TrG5h" value="EU" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjn" role="25R1y">
      <property role="3tVfz5" value="4571589353566840023" />
      <property role="TrG5h" value="AT" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjs" role="25R1y">
      <property role="3tVfz5" value="4571589353566840028" />
      <property role="TrG5h" value="BA" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjy" role="25R1y">
      <property role="3tVfz5" value="4571589353566840034" />
      <property role="TrG5h" value="BE" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjD" role="25R1y">
      <property role="3tVfz5" value="4571589353566840041" />
      <property role="TrG5h" value="BG" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjL" role="25R1y">
      <property role="3tVfz5" value="4571589353566840049" />
      <property role="TrG5h" value="CY" />
    </node>
    <node concept="25R33" id="3XLz4IQjMjU" role="25R1y">
      <property role="3tVfz5" value="4571589353566840058" />
      <property role="TrG5h" value="CZ" />
    </node>
    <node concept="25R33" id="3XLz4IQjMk4" role="25R1y">
      <property role="3tVfz5" value="4571589353566840068" />
      <property role="TrG5h" value="DE" />
    </node>
    <node concept="25R33" id="3XLz4IQjMkf" role="25R1y">
      <property role="3tVfz5" value="4571589353566840079" />
      <property role="TrG5h" value="DK" />
    </node>
    <node concept="25R33" id="3XLz4IQjMkI" role="25R1y">
      <property role="3tVfz5" value="4571589353566840110" />
      <property role="TrG5h" value="EE" />
    </node>
    <node concept="25R33" id="3XLz4IQjMkT" role="25R1y">
      <property role="3tVfz5" value="4571589353566840121" />
      <property role="TrG5h" value="ES" />
    </node>
    <node concept="25R33" id="3XLz4IQjMl5" role="25R1y">
      <property role="3tVfz5" value="4571589353566840133" />
      <property role="TrG5h" value="FI" />
    </node>
    <node concept="25R33" id="3XLz4IQjMli" role="25R1y">
      <property role="3tVfz5" value="4571589353566840146" />
      <property role="TrG5h" value="FR" />
    </node>
    <node concept="25R33" id="3XLz4IQjMlw" role="25R1y">
      <property role="3tVfz5" value="4571589353566840160" />
      <property role="TrG5h" value="GR" />
    </node>
    <node concept="25R33" id="3XLz4IQjMlJ" role="25R1y">
      <property role="3tVfz5" value="4571589353566840175" />
      <property role="TrG5h" value="HR" />
    </node>
    <node concept="25R33" id="3XLz4IQjMlZ" role="25R1y">
      <property role="3tVfz5" value="4571589353566840191" />
      <property role="TrG5h" value="HU" />
    </node>
    <node concept="25R33" id="3XLz4IQjMmg" role="25R1y">
      <property role="3tVfz5" value="4571589353566840208" />
      <property role="TrG5h" value="IE" />
    </node>
    <node concept="25R33" id="3XLz4IQjMmy" role="25R1y">
      <property role="3tVfz5" value="4571589353566840226" />
      <property role="TrG5h" value="IS" />
    </node>
    <node concept="25R33" id="3XLz4IQjMmP" role="25R1y">
      <property role="3tVfz5" value="4571589353566840245" />
      <property role="TrG5h" value="IT" />
    </node>
    <node concept="25R33" id="3XLz4IQjMn9" role="25R1y">
      <property role="3tVfz5" value="4571589353566840265" />
      <property role="TrG5h" value="LT" />
    </node>
    <node concept="25R33" id="3XLz4IQjMnu" role="25R1y">
      <property role="3tVfz5" value="4571589353566840286" />
      <property role="TrG5h" value="LU" />
    </node>
    <node concept="25R33" id="3XLz4IQjMnO" role="25R1y">
      <property role="3tVfz5" value="4571589353566840308" />
      <property role="TrG5h" value="LV" />
    </node>
    <node concept="25R33" id="3XLz4IQjMob" role="25R1y">
      <property role="3tVfz5" value="4571589353566840331" />
      <property role="TrG5h" value="MT" />
    </node>
    <node concept="25R33" id="3XLz4IQjMoz" role="25R1y">
      <property role="3tVfz5" value="4571589353566840355" />
      <property role="TrG5h" value="NL" />
    </node>
    <node concept="25R33" id="3XLz4IQjMoW" role="25R1y">
      <property role="3tVfz5" value="4571589353566840380" />
      <property role="TrG5h" value="NO" />
    </node>
    <node concept="25R33" id="3XLz4IQjMpm" role="25R1y">
      <property role="3tVfz5" value="4571589353566840406" />
      <property role="TrG5h" value="PL" />
    </node>
    <node concept="25R33" id="3XLz4IQjMpL" role="25R1y">
      <property role="3tVfz5" value="4571589353566840433" />
      <property role="TrG5h" value="PT" />
    </node>
    <node concept="25R33" id="3XLz4IQjMqd" role="25R1y">
      <property role="3tVfz5" value="4571589353566840461" />
      <property role="TrG5h" value="RO" />
    </node>
    <node concept="25R33" id="3XLz4IQjMqE" role="25R1y">
      <property role="3tVfz5" value="4571589353566840490" />
      <property role="TrG5h" value="SE" />
    </node>
    <node concept="25R33" id="3XLz4IQjMr8" role="25R1y">
      <property role="3tVfz5" value="4571589353566840520" />
      <property role="TrG5h" value="SI" />
    </node>
    <node concept="25R33" id="3XLz4IQjMrB" role="25R1y">
      <property role="3tVfz5" value="4571589353566840551" />
      <property role="TrG5h" value="SK" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1oo1qC">
    <property role="EcuMT" value="7754580153243539112" />
    <property role="TrG5h" value="ValidationRules" />
    <property role="19KtqR" value="true" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="6ItNp1oo1qD" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539113" />
      <property role="TrG5h" value="memberState" />
      <ref role="AX2Wp" node="6ItNp1oo1qz" resolve="MemberState" />
    </node>
    <node concept="1TJgyi" id="3XLz4IQjFzh" role="1TKVEl">
      <property role="IQ2nx" value="4571589353566812369" />
      <property role="TrG5h" value="showAssertions" />
      <ref role="AX2Wp" to="tpck:fKAQMTB" resolve="boolean" />
    </node>
    <node concept="PrWs8" id="6ItNp1oo1qF" role="PzmwI">
      <ref role="PrY4T" to="tpck:h0TrEE$" resolve="INamedConcept" />
    </node>
    <node concept="1TJgyj" id="6ItNp1oo1rG" role="1TKVEi">
      <property role="IQ2ns" value="7754580153243539180" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="rules" />
      <property role="20lbJX" value="fLJekj5/_0__n" />
      <ref role="20lvS9" node="6ItNp1oo1qE" resolve="ValidationRule" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1oo1qE">
    <property role="EcuMT" value="7754580153243539114" />
    <property role="TrG5h" value="ValidationRule" />
    <property role="34LRSv" value="rule" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="6ItNp1oo1rH" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539181" />
      <property role="TrG5h" value="type" />
      <ref role="AX2Wp" node="6ItNp1oo1qG" resolve="RuleType" />
    </node>
    <node concept="1TJgyi" id="6ItNp1oo1rI" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539182" />
      <property role="TrG5h" value="sequenceNumber" />
      <ref role="AX2Wp" node="51wT2Ro$d1j" resolve="SequenceNumber" />
    </node>
    <node concept="1TJgyi" id="6ItNp1oo1s9" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539209" />
      <property role="TrG5h" value="businessDescription" />
      <ref role="AX2Wp" to="tpck:fKAOsGN" resolve="string" />
    </node>
    <node concept="1TJgyi" id="6ItNp1oo1sa" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539210" />
      <property role="TrG5h" value="description" />
      <ref role="AX2Wp" to="tpck:fKAOsGN" resolve="string" />
    </node>
    <node concept="1TJgyi" id="6ItNp1oo1sb" role="1TKVEl">
      <property role="IQ2nx" value="7754580153243539211" />
      <property role="TrG5h" value="inputParameterDescription" />
      <ref role="AX2Wp" to="tpck:fKAOsGN" resolve="string" />
    </node>
    <node concept="1TJgyj" id="51wT2RozYjx" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356428001" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="certLogicExpression" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" to="u3iy:6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="25R3W" id="6ItNp1oo1qG">
    <property role="3F6X1D" value="7754580153243539116" />
    <property role="TrG5h" value="RuleType" />
    <node concept="25R33" id="6ItNp1oo1qH" role="25R1y">
      <property role="3tVfz5" value="7754580153243539117" />
      <property role="TrG5h" value="GR" />
      <property role="1L1pqM" value="General" />
    </node>
    <node concept="25R33" id="6ItNp1oo1qI" role="25R1y">
      <property role="3tVfz5" value="7754580153243539118" />
      <property role="TrG5h" value="VR" />
      <property role="1L1pqM" value="Vaccination" />
    </node>
    <node concept="25R33" id="6ItNp1oo1qJ" role="25R1y">
      <property role="3tVfz5" value="7754580153243539119" />
      <property role="TrG5h" value="TR" />
      <property role="1L1pqM" value="Test" />
    </node>
    <node concept="25R33" id="6ItNp1oo1qK" role="25R1y">
      <property role="3tVfz5" value="7754580153243539120" />
      <property role="TrG5h" value="RR" />
      <property role="1L1pqM" value="Recovery" />
    </node>
  </node>
  <node concept="Az7Fb" id="51wT2Ro$d1j">
    <property role="3F6X1D" value="5791880006356488275" />
    <property role="TrG5h" value="SequenceNumber" />
    <property role="FLfZY" value="\\d{4}" />
  </node>
  <node concept="Az7Fb" id="4EiGIF0uzRN">
    <property role="3F6X1D" value="5373554026727751155" />
    <property role="TrG5h" value="DateTimeFormat" />
    <property role="FLfZY" value="\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}[+-]\\d{2}:\\d{2}" />
  </node>
</model>

