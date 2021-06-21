<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:c849d378-e965-4689-a87a-8119028c50b2(CertLogic.structure)">
  <persistence version="9" />
  <languages>
    <use id="c72da2b9-7cce-4447-8389-f407dc1158b7" name="jetbrains.mps.lang.structure" version="9" />
    <devkit ref="78434eb8-b0e5-444b-850d-e7c4ad2da9ab(jetbrains.mps.devkit.aspect.structure)" />
  </languages>
  <imports>
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
        <property id="4628067390765907488" name="conceptShortDescription" index="R4oN_" />
        <property id="5092175715804935370" name="conceptAlias" index="34LRSv" />
        <child id="1071489727083" name="linkDeclaration" index="1TKVEi" />
        <child id="1071489727084" name="propertyDeclaration" index="1TKVEl" />
      </concept>
      <concept id="1169125989551" name="jetbrains.mps.lang.structure.structure.InterfaceConceptDeclaration" flags="ig" index="PlHQZ" />
      <concept id="1169127622168" name="jetbrains.mps.lang.structure.structure.InterfaceConceptReference" flags="ig" index="PrWs8">
        <reference id="1169127628841" name="intfc" index="PrY4T" />
      </concept>
      <concept id="1071489090640" name="jetbrains.mps.lang.structure.structure.ConceptDeclaration" flags="ig" index="1TIwiD">
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
  <node concept="PlHQZ" id="6ItNp1ojfSn">
    <property role="EcuMT" value="7754580153242287639" />
    <property role="TrG5h" value="Expression" />
  </node>
  <node concept="1TIwiD" id="6ItNp1ojsDU">
    <property role="EcuMT" value="7754580153242339962" />
    <property role="TrG5h" value="Integer" />
    <property role="34LRSv" value="0" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="6ItNp1ojsDV" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="6ItNp1ojsDW" role="1TKVEl">
      <property role="IQ2nx" value="7754580153242339964" />
      <property role="TrG5h" value="value" />
      <ref role="AX2Wp" to="tpck:fKAQMTA" resolve="integer" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1okL7g">
    <property role="TrG5h" value="BinaryOperation" />
    <property role="EcuMT" value="7754580153242338468" />
    <property role="34LRSv" value="binary operation" />
    <node concept="1TJgyj" id="6ItNp1ojsi_" role="1TKVEi">
      <property role="IQ2ns" value="7754580153242338469" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="leftOperand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="6ItNp1ojsiA" role="1TKVEi">
      <property role="IQ2ns" value="7754580153242338470" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="rightOperand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="PrWs8" id="6ItNp1ojtQa" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="6ItNp1okL7y" role="1TKVEl">
      <property role="IQ2nx" value="7754580153242685922" />
      <property role="TrG5h" value="operator" />
      <ref role="AX2Wp" node="6ItNp1okL7k" resolve="BinaryOperator" />
    </node>
  </node>
  <node concept="25R3W" id="6ItNp1okL7k">
    <property role="3F6X1D" value="7754580153242685908" />
    <property role="TrG5h" value="BinaryOperator" />
    <node concept="25R33" id="51wT2RoDptl" role="25R1y">
      <property role="3tVfz5" value="5791880006357849941" />
      <property role="TrG5h" value="equality" />
      <property role="1L1pqM" value="===" />
    </node>
    <node concept="25R33" id="6ItNp1okL7m" role="25R1y">
      <property role="3tVfz5" value="7754580153242685910" />
      <property role="TrG5h" value="and" />
    </node>
    <node concept="25R33" id="6ItNp1okL7p" role="25R1y">
      <property role="3tVfz5" value="7754580153242685913" />
      <property role="TrG5h" value="gt" />
      <property role="1L1pqM" value="&gt;" />
    </node>
    <node concept="25R33" id="6ItNp1okL7t" role="25R1y">
      <property role="3tVfz5" value="7754580153242685917" />
      <property role="TrG5h" value="lt" />
      <property role="1L1pqM" value="&lt;" />
    </node>
    <node concept="25R33" id="6ItNp1olbka" role="25R1y">
      <property role="3tVfz5" value="7754580153242793226" />
      <property role="TrG5h" value="geq" />
      <property role="1L1pqM" value="&gt;=" />
    </node>
    <node concept="25R33" id="6ItNp1olbkg" role="25R1y">
      <property role="3tVfz5" value="7754580153242793232" />
      <property role="TrG5h" value="leq" />
      <property role="1L1pqM" value="&lt;=" />
    </node>
    <node concept="25R33" id="6ItNp1ooGDC" role="25R1y">
      <property role="3tVfz5" value="7754580153243716200" />
      <property role="TrG5h" value="in" />
    </node>
    <node concept="25R33" id="51wT2Ro$pJs" role="25R1y">
      <property role="3tVfz5" value="5791880006356540380" />
      <property role="TrG5h" value="plus" />
      <property role="1L1pqM" value="+" />
    </node>
    <node concept="25R33" id="3h3ARDz8Wz1" role="25R1y">
      <property role="3tVfz5" value="3766024663363471553" />
      <property role="TrG5h" value="after" />
    </node>
    <node concept="25R33" id="3h3ARDz8Wzb" role="25R1y">
      <property role="3tVfz5" value="3766024663363471563" />
      <property role="TrG5h" value="before" />
    </node>
    <node concept="25R33" id="3h3ARDz8Wzm" role="25R1y">
      <property role="3tVfz5" value="3766024663363471574" />
      <property role="TrG5h" value="notAfter" />
      <property role="1L1pqM" value="not-after" />
    </node>
    <node concept="25R33" id="3h3ARDz8Wzy" role="25R1y">
      <property role="3tVfz5" value="3766024663363471586" />
      <property role="TrG5h" value="notBefore" />
      <property role="1L1pqM" value="not-before" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1okNom">
    <property role="EcuMT" value="7754580153242695190" />
    <property role="TrG5h" value="DataAccess" />
    <property role="34LRSv" value="/ (var)" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyi" id="6ItNp1okNon" role="1TKVEl">
      <property role="IQ2nx" value="7754580153242695191" />
      <property role="TrG5h" value="path" />
      <ref role="AX2Wp" node="51wT2RoGz9S" resolve="DataAccessPath" />
    </node>
    <node concept="PrWs8" id="6ItNp1okQJo" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1ol78Q">
    <property role="EcuMT" value="7754580153242776118" />
    <property role="TrG5h" value="String" />
    <property role="34LRSv" value="&quot;" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="6ItNp1ol78R" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="6ItNp1ol78T" role="1TKVEl">
      <property role="IQ2nx" value="7754580153242776121" />
      <property role="TrG5h" value="value" />
      <ref role="AX2Wp" to="tpck:fKAOsGN" resolve="string" />
    </node>
  </node>
  <node concept="1TIwiD" id="6ItNp1ooNyJ">
    <property role="EcuMT" value="7754580153243744431" />
    <property role="TrG5h" value="It" />
    <property role="34LRSv" value="it (var-nil)" />
    <property role="R4oN_" value="shorthand for { &quot;var&quot;: &quot;&quot; }" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="6ItNp1ooNyK" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2Ro$kdv">
    <property role="EcuMT" value="5791880006356517727" />
    <property role="TrG5h" value="Reduce" />
    <property role="34LRSv" value="reduce" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2Ro$kdw" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$kdy" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356517730" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="operand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$kd$" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356517732" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="lambda" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$kdB" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356517735" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="initial" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2Ro$qsJ">
    <property role="EcuMT" value="5791880006356543279" />
    <property role="TrG5h" value="IfThenElse" />
    <property role="34LRSv" value="if" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2Ro$qsK" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$qsM" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356543282" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="guard" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$qsO" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356543284" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="then" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$qsR" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356543287" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="else" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2Ro$wqW">
    <property role="EcuMT" value="5791880006356567740" />
    <property role="TrG5h" value="Array" />
    <property role="34LRSv" value="[" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2Ro$wqX" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro$wqZ" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356567743" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="members" />
      <property role="20lbJX" value="fLJekj5/_0__n" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2Ro$Yzm">
    <property role="EcuMT" value="5791880006356691158" />
    <property role="TrG5h" value="Boolean" />
    <property role="34LRSv" value="boolean" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2Ro$Yzn" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="51wT2Ro$Yzr" role="1TKVEl">
      <property role="IQ2nx" value="5791880006356691163" />
      <property role="TrG5h" value="value" />
      <ref role="AX2Wp" to="tpck:fKAQMTB" resolve="boolean" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2Ro_oXn">
    <property role="EcuMT" value="5791880006356799319" />
    <property role="TrG5h" value="Not" />
    <property role="34LRSv" value="!" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2Ro_oXo" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyj" id="51wT2Ro_oXq" role="1TKVEi">
      <property role="IQ2ns" value="5791880006356799322" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="operand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2RoDdvt">
    <property role="EcuMT" value="5791880006357800925" />
    <property role="TrG5h" value="VariadicInfixOperation" />
    <property role="34LRSv" value="variadic infix operation" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="1TJgyj" id="51wT2RoDdvw" role="1TKVEi">
      <property role="IQ2ns" value="5791880006357800928" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="operands" />
      <property role="20lbJX" value="fLJekj5/_0__n" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="51wT2RoDdvu" role="1TKVEl">
      <property role="IQ2nx" value="5791880006357800926" />
      <property role="TrG5h" value="operator" />
      <ref role="AX2Wp" node="6ItNp1okL7k" resolve="BinaryOperator" />
    </node>
    <node concept="PrWs8" id="51wT2RoDoNT" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="1TIwiD" id="51wT2RoDq9q">
    <property role="EcuMT" value="5791880006357852762" />
    <property role="TrG5h" value="PlusTime" />
    <property role="34LRSv" value="+ time" />
    <ref role="1TJDcQ" to="tpck:gw2VY9q" resolve="BaseConcept" />
    <node concept="PrWs8" id="51wT2RoDq9r" role="PzmwI">
      <ref role="PrY4T" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
    <node concept="1TJgyi" id="51wT2RoDq9t" role="1TKVEl">
      <property role="IQ2nx" value="5791880006357852765" />
      <property role="TrG5h" value="amount" />
      <ref role="AX2Wp" to="tpck:fKAQMTA" resolve="integer" />
    </node>
    <node concept="1TJgyi" id="55O0TMOtwGl" role="1TKVEl">
      <property role="IQ2nx" value="5869320185948015381" />
      <property role="TrG5h" value="unit" />
      <ref role="AX2Wp" node="55O0TMOtwBi" resolve="TimeUnit" />
    </node>
    <node concept="1TJgyj" id="51wT2RoDq9v" role="1TKVEi">
      <property role="IQ2ns" value="5791880006357852767" />
      <property role="20lmBu" value="fLJjDmT/aggregation" />
      <property role="20kJfa" value="operand" />
      <property role="20lbJX" value="fLJekj4/_1" />
      <ref role="20lvS9" node="6ItNp1ojfSn" resolve="Expression" />
    </node>
  </node>
  <node concept="Az7Fb" id="51wT2RoGz9S">
    <property role="3F6X1D" value="5791880006358676088" />
    <property role="TrG5h" value="DataAccessPath" />
    <property role="FLfZY" value="((\\w[\\w\\d-]*)|\\d+)(\\.((\\w[\\w\\d-]*)|\\d+))*" />
  </node>
  <node concept="25R3W" id="55O0TMOtwBi">
    <property role="3F6X1D" value="5869320185948015058" />
    <property role="TrG5h" value="TimeUnit" />
    <ref role="1H5jkz" node="55O0TMOtwBj" resolve="day" />
    <node concept="25R33" id="55O0TMOtwBj" role="25R1y">
      <property role="3tVfz5" value="5869320185948015059" />
      <property role="TrG5h" value="day" />
    </node>
    <node concept="25R33" id="55O0TMOtwBk" role="25R1y">
      <property role="3tVfz5" value="5869320185948015060" />
      <property role="TrG5h" value="hour" />
    </node>
  </node>
</model>

